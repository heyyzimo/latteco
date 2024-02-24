import Nav from "../Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";


function Kanbas() {
 return(
  <div className="d-flex">
   <KanbasNavigation />
   <div style={{ flexGrow: 1 }}>
      <Routes> //only the route selected can be rendered for this routes element
         <Route path="/" element={<Navigate to="Dashboard" />} />
         <Route path="Account" element={<h1>Account</h1>} />
         <Route path="Dashboard" element={<Dashboard />} />
         <Route path="Courses/:courseId/*" element={<Courses />} />
         
      </Routes>

   </div>

  </div>
 )
}

 export default Kanbas
 
 