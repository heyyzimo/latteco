import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses, FaAngleRight } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import "./index.css";
function Courses() {
  const { courseId } = useParams(); // the parameter marked in the route using ':courseId'
  const course = courses.find((course) => course._id === courseId);
  const location = useLocation();
  // track current course navigation tab for breadcrumb
  const pathnames = location.pathname.split('/').filter(x => x);
  const currentTab = pathnames[pathnames.length - 1];
  return (
    <div>
      <span className="wd-breadcrumb" >
        <HiMiniBars3 /> {course?.number}  {course?._id} {course?.name}
        <FaAngleRight /> 
        {currentTab}
        <button className="btn btn-outline-secondary float-end"><FaGlasses/>  Student View</button>
      </span>
      <hr/><br/>
      <CourseNavigation />
      
        <div>
            <div 
            className="overflow-y-scroll position-fixed bottom-0 end-0"
            style={{ left: "280px", top: "80px" }}>
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home/>} />
                    <Route path="Modules" element={<Modules/>} />
                    <Route path="ZoomMeetings" element={<h1>Zoom Meetings</h1>} />
                    <Route path="Piazza" element={<h1>Piazza</h1>} />
                    <Route path="Assignments" element={<h1>Assignments</h1>} />
                    <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                    <Route path="Grades" element={<h1>Grades</h1>} />
                </Routes>


            </div>
        </div>
    </div>
    
  );
}
export default Courses;