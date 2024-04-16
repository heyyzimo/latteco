import Nav from "../Nav";
import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import db from "./Database";
import { useState, useEffect } from "react";
import axios from "axios";
import * as client from "./client"; 
import {Course} from "./client"
//const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
   const [courses, setCourses] = useState<Course[]>([]);
   //const COURSES_API = `${API_BASE}/api/courses`;
   const findAllCourses = async () => {
   //const response = await axios.get(COURSES_API);
   const response = await client.findAllCourses();
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);
  /*
   const [course, setCourse] = useState({
     courseId: "1234", name: "New Course", number: "New Number",
     startDate: "2023-09-10", endDate: "2023-12-15",
   });

   const addNewCourse = async(course : Course) => {
    const response = await client.addNewCourse(course);
    setCourses([...courses, response.data]);
   };
   const deleteCourse = async(courseId: String) => {
    const response_status = await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course.id !== courseId));
   };
   const updateCourse = async(course : Course) => {
    const response_status = await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
         if (c.id === course.id) {
           return course;
         } else {
           return c;
         }
       })
     );
   };*/
 return(
   <Provider store={store}>
  <div className="d-flex">
   <KanbasNavigation />
   <div style={{ flexGrow: 1 }}>
      <Routes> //only the route selected can be rendered for this routes element
         <Route path="/" element={<Navigate to="Dashboard" />} />
         <Route path="Account/*" element={<Account/>} />
         <Route path="Dashboard" element={            
            <Dashboard
              /*courses={courses}
              course={course}
              setCourse={setCourse}
              setCourses={setCourses}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}*//>} />
         <Route path="Courses/:courseId/*" element={
            <Courses />} />
      </Routes>
   </div>
  </div>
</Provider>
);
}
export default Kanbas
 
 