import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses, FaAngleRight } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import "./index.css";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizzesDetails from "./Quizzes/Details";
import QuizPreview from "./Quizzes/Preview";
function Courses() {
  const { courseId } = useParams(); // the parameter marked in the route using ':courseId'
  console.log(courseId);
  const API_BASE = process.env.REACT_APP_API_BASE;
  //const COURSES_API = `http://localhost:4000/api/courses`;
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: courseId });
  
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    if(courseId){
      findCourseById(courseId);

    }
    
  }, [courseId]);


  /*const course = courses.find((course) => course._id === courseId);
  const location = useLocation();
  // track current course navigation tab for breadcrumb
  const pathnames = location.pathname.split('/').filter(x => x);
    const currentTab = pathnames[pathnames.length - 1];
  */

  
  return (
    <div>
      <span className="wd-breadcrumb" >
        <HiMiniBars3 /> {course?.number}  {course?._id} {course?.name}
        <FaAngleRight /> 
        {/*currentTab*/}
        <button className="btn btn-outline-secondary float-end"><FaGlasses/>  Student View</button>
      </span>
      <hr/><br/>
      <CourseNavigation />
      
        <div>
            <div 
            className="overflow-y-scroll position-fixed bottom-0 end-0 m-3"
            style={{ left: "280px", top: "80px" }}>
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home/>} />
                    <Route path="Modules" element={<Modules/>} />
                    <Route path="ZoomMeetings" element={<h1>Zoom Meetings</h1>} />
                    <Route path="Piazza" element={<h1>Piazza</h1>} />
                    <Route path="Assignments" element={<Assignments/>} />
                    <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
                    <Route path="Quizzes" element={<Quizzes/>} />
                    <Route path="Quizzes/:quizId" element={<QuizEditor/>}/>
                    <Route path="Quizzes/QuizzesDetails/:quizId" element={<QuizzesDetails/>}/>
                    <Route path="Quizzes/QuizPreview/:quizId" element={<QuizPreview/>}/>
                    <Route path="Grades" element={<Grades />} />
                </Routes>
            </div>
        </div>
    </div>
    
  );
}
export default Courses;