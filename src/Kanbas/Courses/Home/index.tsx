import ModuleList from "../Modules/List";
import CourseStatus from "./CourseStatus";
import "./index.css";
function Home() {
  return (
    <div className="d-flex" >
        <div>
        <ModuleList />
        </div>
        <div>
        <CourseStatus />
        </div>
      
    </div>
  );
}
export default Home;

