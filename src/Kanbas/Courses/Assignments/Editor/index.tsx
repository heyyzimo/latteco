import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV, FaCalendarAlt} from "react-icons/fa";

import "./index.css";
function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
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
                    <input type="text" className="form-control mb-2" id="assignmentName" placeholder={assignment?.title}/>
                </div>
                {/*Assignment Description */}
                <div className="form-group">
                  <textarea className="form-control" value="New Assignment Description" id="assignmentDescription" rows={3} ></textarea>
                </div>
                  <div className="form-group row">
                  <label htmlFor="points" className="col-sm-5 col-form-label wd-text-right">Points</label>
                  <div className="col-sm-7">
                  <input type="number" className="form-control float-right" id="points" placeholder="100"/>
                  </div>
                </div>
                <div className="form-group mt-3">
                  
                  <div className="row">
                    <label htmlFor="assign" className="col wd-text-right col-sm-5">Assign</label>
                    <div className="col-sm-7">
                      <div className="wd-card">
                        <div className="wd-card-body">
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label wd-bold-text" >Due</label>
                            <div className="input-group">
                              <input type="date" className="form-control" aria-label="Due date" id="dueDate"/>
                              {/*<button className="btn btn-outline-secondary" type="button">
                              <FaCalendarAlt />
                              </button>*/}
                            </div>
                        </div>
                        <div className="mb-3 row">
                          
                          <div className="col">
                            <label htmlFor="startdate" className="form-label wd-bold-text" >Available from</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="availableFrom"/>
                              {/*<button className="btn btn-outline-secondary" type="button">
                                <FaCalendarAlt /> </button>*/}
                            </div>
                          </div>
                          <div className="col">
                          <label htmlFor="enddate" className="form-label wd-bold-text" >Until</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="until"/>
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
                <button onClick={handleSave} className="btn btn-success ms-2 float-end">
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