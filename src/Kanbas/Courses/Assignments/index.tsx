import React, {useEffect} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaEdit, FaListUl } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import * as client from "./client";  
import { KanbasState } from "../../store";
import { useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./assignmentsReducer";
import { useDispatch } from "react-redux";
function Assignments() {
  const { courseId } = useParams();
  console.log('courseId:', courseId);
  const dispatch = useDispatch();
  const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
  const handleDelete = (assignment: any) => { 
    client.deleteAssignment(assignment.id).then((status) => {
      dispatch(deleteAssignment(assignment.id));
      console.log('Deleting assignment:', assignment, 'assignments after deleting:', assignments);
    })
  };
  useEffect(() => {
    client.findAssignmentsForCourse(courseId!)
      .then((assignments) =>
        dispatch(setAssignments(assignments))
    );
    console.log('assignments:', assignments);
  }, [courseId]);

  return (
    <>
       {/* Add buttons here */} 
        
       <div className="wd-assignment-buttons d-flex" >
        <input type="text" className="form-control" placeholder="Search For Assignment" style={{width:300}}/>
        <div className="ms-auto">
            <button className="btn btn-outline-secondary ">+Group</button>
            <Link to= {`/Kanbas/Courses/${courseId}/Assignments/000`}>
            <button className="btn btn-danger wd-redbutton " onClick={() =>console.log('courseId', courseId)}>+Assignment</button>
            </Link>
            <button className="btn btn-outline-secondary "><FaEllipsisV className="me-2" /></button>
        </div>
       </div>
       <hr/>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
            <div className="d-flex align-items-center wd-assignment-title">
                <FaEllipsisV className="me-2" /> ASSIGNMENTS
                <div className="ms-auto">
                {/*40% of Total with rounded border*/}
                <span className="border rounded-pill px-2 py-1 me-2" >
                    40% of Total
                </span>
                {/*Plus button*/}
                <button className="btn btn-outline-secondary btn-sm me-2 wd-plusbutton">+</button>
                {/*Ellipse button*/}
                <FaEllipsisV />
                </div>
            </div>
          <ul className="list-group">
            {assignments && assignments.map((assignment, index) => (
                
              <li key={index} className="list-group-item">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <FaListUl /> 
                        </div>
                        <div className="col-auto text-center">
                            {/*icon for each assignment*/}                         
                            <FaEdit style={{color:"green", fontSize:'25px'}} />
                        </div>
                        <div className="col-auto"> {/*assignment content*/}
                            <div className="fw-bold"> {/*1st line*/}
                                <Link className="text-decoration-none" style={{color:"black"}}
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}
                                </Link>
                            </div>
                            <div>
                                <span className="text-muted">Due: {assignment.due}| Points: {assignment.points}</span>
                                
                            </div>
                        </div>
                        <div className="col">
                        <span className="float-end">
                        <button className="btn btn-sm btn-danger wd-redbutton" onClick={() => handleDelete(assignment)} >
                            Delete
                        </button>
                    <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" />
                        </span>
                        </div>
                    </div>
                </div>
              </li>
              ))}
          </ul>
        </li>
      </ul>
    </>
);
}


function useCourseId() {
  const { courseId } = useParams();
  return courseId;
}

export { useCourseId };
export default Assignments;

