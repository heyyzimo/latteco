import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
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