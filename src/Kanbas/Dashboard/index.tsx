import React, {useState} from "react";
import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";
function Dashboard(
  // move the state variables and functions to the parent component and pass them as parameters
  { courses, course, setCourse, setCourses, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void; setCourses: (courses: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) 
  {
  
  /* 
  const [courses, setCourses] = useState(db.courses);
  // convert course into a state variable so we can change it and force a redraw of the UI
  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg"
  });
  const addNewCourse = () => {
    const newCourse = { ...course,
                        _id: new Date().getTime().toString() }; // override the id.
    setCourses([...courses, newCourse ]); // my own version (different from given starter codes)
  };
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  // update the course matching the id of the current course in the state variable
  const updateCourse = () => {
    setCourses(
      courses.map((c) => { 
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };*/

  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h2>Published Courses (12) </h2>  
      
    <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-5">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                     style={{ height: 150 }}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      <div style={{textAlign: 'right'}}>
                      <button className="btn btn-sm btn-primary" onClick={(e) => {
                        e.preventDefault();
                        setCourse(course);
                      }}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={(e) => {
                        e.preventDefault();
                        deleteCourse(course._id);
                      }}>
                      Delete
                    </button>
                      </div>

                    {course.number} 
                    {course.name} 
                    

                    </Link>
                    
                  <p className="card-text">{course.name}</p>
                  {course._id && (
                    <Link to={`/Kanbas/Courses/${course._id}/Home` } className="btn btn-primary">
                    Go </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h5> Course </h5>
      <input value={course.name} className="form-control"  onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
      <input value={course.number} className="form-control"  onChange={(e) => setCourse({ ...course, number: e.target.value }) }/>
      <input value={course.startDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, startDate: e.target.value }) } />
      <input value={course.endDate} className="form-control" type="date"  onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
      <button className="btn btn-sm btn-primary" onClick={addNewCourse} >
        Add
      </button>
      <button className="btn btn-sm btn-primary" onClick={updateCourse} >
        Update
      </button>

    </div>
  );
}
export default Dashboard;

