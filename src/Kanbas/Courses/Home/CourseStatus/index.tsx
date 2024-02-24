import ToDo from "./ToDo";

function CourseStatus() {

    return (
        <div className="flex-grow-0 me-2 d-none d-lg-block" style={{width: '250px'}}>
            <button className="btn btn-outline-secondary wd-status-button"> Import existing content</button><br />
            <button className="btn btn-outline-secondary wd-status-button"> Import From Commons</button><br />
            <button className="btn btn-outline-secondary wd-status-button"> Choose Home Page</button><br /> 
            <button className="btn btn-outline-secondary wd-status-button"> View Course Stream</button><br /> 
            <button className="btn btn-outline-secondary wd-status-button"> New Annoucement</button><br /> 
            <button className="btn btn-outline-secondary wd-status-button"> New Analytics</button><br /> 
            <button className="btn btn-outline-secondary wd-status-button"> View Course Notifications </button><br /> 
            <h4>To Do</h4> <hr />
            <ToDo />
        </div>
    )
}
export default CourseStatus;