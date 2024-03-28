import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV, FaCalendarAlt} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment, updateAssignment, selectAssignment } from "../assignmentsReducer";
import { KanbasState } from "../../../store";

import "./index.css";
function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  let assignment = assignments.find(
    (assignment) => assignment._id === assignmentId); // edit the assignment with chosen id.
  
    if (assignment === undefined) {
      assignment = {
        _id: '000',
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
  console.log('courseId:', courseId, 'assignmentId:', assignment._id, 'end', 'duedate:', assignment.due, 'assignmentTitle:', assignment.title, 'assignmentDescription:', assignment.description, 'points:', assignment.points);
  const handleSave = () => {
    const isEditing = assignment._id !== '000';
    const updatedAssignment = { ...assignment };
    // edit existing assignment or add new assignment
    //dispatch(updateAssignment(assignment)),
    console.log(isEditing);
    console.log('Saving assignment:', assignment?.title, 'to course:', courseId);
    // !: non-null assertion 
    // add new assignment when assignment._id is null, update assignment otherwise
    if(isEditing) {
      dispatch(updateAssignment(updatedAssignment));
      console.log("Updated Assignment:", updatedAssignment);
    } else {
      dispatch(addAssignment({...updatedAssignment, course: courseId}));
      console.log("Added Assignment:", updatedAssignment);
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
                    <input type="text" className="form-control mb-2" id="assignmentName" placeholder= {assignment?.title}
                    onChange={(e) => dispatch(selectAssignment({...assignment, title: e.target.value}))}
                    />
                </div>
                {/*Assignment Description */}
                <div className="form-group">
                  <textarea className="form-control" id="assignmentDescription" rows={3} placeholder="new description"
                  onChange={(e) => dispatch(selectAssignment({...assignment, description: e.target.value}))}>
                  </textarea>
                </div>
                  <div className="form-group row">
                  <label htmlFor="points" className="col-sm-5 col-form-label wd-text-right">Points</label>
                  <div className="col-sm-7">
                  <input type="number" className="form-control float-right" id="points" placeholder="100" 
                    onChange={(e) => dispatch(selectAssignment({...assignment, points: e.target.value}))}
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
                              <input type="date" className="form-control" aria-label="Due date" id="dueDate" 
                              onChange={(e) => dispatch(selectAssignment({...assignment, due: e.target.value}))}
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
                              <input type="date" className="form-control" id="availableFrom" 
                              onChange={(e) => dispatch(selectAssignment({...assignment, availableFrom: e.target.value}))}
                              />
                              {/*<button className="btn btn-outline-secondary" type="button">
                                <FaCalendarAlt /> </button>*/}
                            </div>
                          </div>
                          <div className="col">
                          <label htmlFor="enddate" className="form-label wd-bold-text" >Until</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="until"
                              onChange={(e) => dispatch(selectAssignment({...assignment, availableUntil: e.target.value}))}/>
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