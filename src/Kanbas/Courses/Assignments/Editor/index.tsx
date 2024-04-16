import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV, FaCalendarAlt} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment, updateAssignment, selectAssignment, setAssignments } from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";
import axios from "axios";

import "./index.css";
import { current } from "@reduxjs/toolkit";
function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
  let currentAssignment = assignments.find(
  (assignment) => assignment.id === assignmentId); // edit the assignment with chosen id.
  // useState to store the assignment details
  // less update of the global state
  const [title, setTitle] = useState(currentAssignment?.title || "New Assignment 123");
  const [description, setDescription] = useState(currentAssignment?.description || "New Description");
  const [points, setPoints] = useState(currentAssignment?.points || new Date().toISOString().split('T')[0]);
  const [due, setDue] = useState(currentAssignment?.due || new Date().toISOString().split('T')[0]);
  const [availableFrom, setAvailableFrom] = useState(currentAssignment?.availableFrom || new Date().toISOString().split('T')[0]);
  const [availableUntil, setAvailableUntil] = useState(currentAssignment?.availableUntil || new Date().toISOString().split('T')[0]);
  
  if (currentAssignment === undefined) {
    currentAssignment = {
        id: '000',
        title: 'New Assignment 123', 
        description: 'New Description',
        due:new Date().toISOString().split('T')[0],
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date().toISOString().split('T')[0],
        points: 100,
        course: 'RS000',    
    };  
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //create
  const handleAddAssignment = () => {
    client.createAssignment(courseId!, assignment).then((assignment) => {
      dispatch(addAssignment({...assignment, course: courseId}));
    });
  };
  //update
  const handleUpdateAssignment = async () => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleSave = async() => {
    // if currentAssignment is not undefined, then we are editing an existing assignment
    const isEditing = currentAssignment.id !== '000';
    const updatedAssignment = {...currentAssignment, title, description, points, due, availableFrom, availableUntil};
    // edit existing assignment or add new assignment
    //dispatch(updateAssignment(assignment)),
    console.log('isEditing:', isEditing);
    console.log('Saving assignment:', updatedAssignment?.title, 'to course:', courseId);
    // !: non-null assertion 
    // add new assignment when assignment._id is null, update assignment otherwise
    if(isEditing) { // update
      console.log('Updating assignment:', updatedAssignment);
      const status = client.updateAssignment(updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
      console.log("Updated Assignments:", assignments);
    } else { // create
      const newAssignment = await client.createAssignment(courseId!, updatedAssignment);
      dispatch(addAssignment({...newAssignment, course: courseId}));
      console.log("Added Assignment:", newAssignment);
    }

    /*
    dispatch((assignment!._id === '000')? addAssignment({...assignment!, course: courseId}) : updateAssignment(assignment!));*/
    /*
    dispatch(assignment._id ? updateAssignment(assignment) : addAssignment({...assignment, course: courseId}));
    */
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  return (
    <div>
      
        <div className="d-flex" > {/*heading icons*/}
            <span className="ms-auto">
                <span className="text-success" >
                <FaCheckCircle style={{color:'green'}}/> Published
                </span>
                <button className="btn btn-secondary wd-editor-ellipsis"><FaEllipsisV /></button>
            </span>
        </div> 
        <hr/>
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="assignmentName" className="form-label">Assignment Name</label>
                    <input type="text" className="form-control mb-2" id="assignmentName" placeholder= {currentAssignment?.title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/*Assignment Description */}
                <div className="form-group">
                  <textarea className="form-control" id="assignmentDescription" rows={3} placeholder={currentAssignment.description}
                  onChange={(e) => setDescription(e.target.value)}>
                  </textarea>
                </div>
                  <div className="form-group row">
                  <label htmlFor="points" className="col-sm-5 col-form-label wd-text-right">Points</label>
                  <div className="col-sm-7">
                  <input type="number" className="form-control float-right" id="points"  defaultValue={currentAssignment.points}
                    onChange={(e) => setPoints(e.target.value)}
                  />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <div className="row">
                    <label htmlFor="assign" className="col wd-text-right col-sm-5">Assign</label>
                    <div className="col-sm-7">
                      <div className="wd-card">
                        <div className="wd-card-body">
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label wd-bold-text" 
                            >Due</label>
                            <div className="input-group">
                              <input type="date" className="form-control" aria-label="Due date" id="dueDate"  defaultValue={currentAssignment.due}
                              onChange={(e) => setDue(e.target.value)}
                              />
                              {/*<button className="btn btn-outline-secondary" type="button">
                              <FaCalendarAlt />
                              </button>*/}
                            </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="col">
                            <label htmlFor="startdate" className="form-label wd-bold-text" >Available from</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="availableFrom" defaultValue={currentAssignment.availableFrom}
                              onChange={(e) => setAvailableFrom(e.target.value)}
                              />
                              {/*<button className="btn btn-outline-secondary" type="button">
                                <FaCalendarAlt /> </button>*/}
                            </div>
                          </div>
                          <div className="col">
                          <label htmlFor="enddate" className="form-label wd-bold-text" >Until</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="until"  defaultValue={currentAssignment.availableUntil}
                              onChange={(e) => setAvailableUntil(e.target.value)}/>
                            </div>
                          </div>
                        </div>                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3"> {/* save and cancel buttons*/}
                <hr/>
                <button type="button" onClick={handleSave} className="btn btn-success ms-2 float-end">
                    Save
                </button>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                        className="btn btn-danger float-end">
                    Cancel
                </Link>
                </div>
            </form>

        </div>
    
      
    </div>
  );
}
export default AssignmentEditor;