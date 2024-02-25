import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaFileImport, FaFileExport, FaCog, FaFilter } from "react-icons/fa";
import "./index.css";
function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div className="wd-gradescreen ">
      
      <div className="row" > {/*import, export, settings buttons*/}
        <div className="col"></div>
        <div className="col-auto">
            <button className="btn btn-outline-secondary">
                <FaFileImport /> Import
                </button>
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="exportDropdown" data-toggle="dropdown" aria-haspopup="true" >
                <FaFileExport /> Export
                </button>
                <div className="dropdown-menu" aria-labelledby="exportDropdown">
                    <a className="dropdown-item" href="#">PDF</a>
                    <a className="dropdown-item" href="#">Excel</a>
                    <a className="dropdown-item" href="#">CSV</a>
                </div>
                <button className="btn btn-outline-secondary">
                <FaCog />
                </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6"> {/*student search bar*/}
            <div className="wd-search-label">
                <label>Student Names</label>
            </div>
            <div>
                <div className="input-group mb-3 search-select-input">
                    <label className="form-label"></label>
                    <input type="text" className="form-select wd-select-with-icon" placeholder="Search Students" aria-label="Search term" style={{marginLeft:0}}/>
                </div>
            </div>
        </div>
        <div className="col-6"> {/*assignment search bar*/}
            <div className="wd-search-label">
                <label>Assignments Names</label>
            </div>
            <div>
                <div className="input-group mb-3 search-select-input">
                    <label className="form-label"></label>
                    <input type="text" className="form-select wd-select-with-icon" placeholder="Search Assignments" aria-label="Search term" style={{marginLeft:0}}/>
                </div>
            </div>
        </div>
      </div>
      <div className="row">
      <div className="filter-button mb-2">
        <button className="btn btn-outline-secondary">< FaFilter /> Apply Filters</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table wd-gradestable"  >
          <thead>
            <th>Student Name</th>
            {as.map((assignment) => (<th>{assignment.title}</th>))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                   <td>{user?.firstName} {user?.lastName}</td>
                   {assignments.map((assignment) => {
                     const grade = grades.find(
                       (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                       return (<td>{grade?.grade || ""}</td>);})}
                </tr>);
            })}
          </tbody></table>
      </div>
     
      </div>);
}   
export default Grades;

