
import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
    
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
        });

    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "Learn NodeJS with ExpressJS",
        course: "RS101"
        });

    const MODULE_URL = "http://localhost:4000/a5/module"

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
      };
    const updateTitle = async () => {
    const response = await axios
        .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
    fetchAssignment();
    }, []);
    
  return (
    <div >
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a className="btn wd-bluebutton" href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a className="btn wd-bluebutton" href="http://localhost:4000/a5/assignment/title">
        Get Title
      </a>

      <h4>Modifying Properties</h4>
      <input type="text" className="form-control" style={{ width: '50%'}}
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.title}/>
      <a className="btn wd-bluebutton" onClick={updateTitle}>
        Update Title to: {assignment.title}
      </a>
      <button className="btn wd-bluebutton"  onClick={fetchAssignment} >
        Fetch Assignment
      </button>
      <input type="number" className="form-control" style={{ width: '50%'}}
        onChange={(e) => setAssignment({ ...assignment,
            score: parseInt(e.target.value) })}
        value={assignment.score}/>
      <a className="btn wd-bluebutton" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update score
      </a><br/>
      <label>Completed</label>
      <input type="checkbox" 
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        checked = {assignment.completed}/>
        <br/>
      <a className="btn wd-bluebutton" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Complete Status
      </a>
      <h4>Retrieving Objects -- Module Object</h4>
      <a className="btn wd-bluebutton" href="http://localhost:4000/a5/module">
        Get Module
      </a>
      <h4>Retrieving Properties -- Module Object</h4>
      <a className="btn wd-bluebutton" href="http://localhost:4000/a5/module/name">
        Get Module Name
      </a>
      <h4>Modifying Properties -- Module Object</h4>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            name: e.target.value })}
        value={module.name}/>
      <a className="btn wd-bluebutton" href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name
      </a>
    </div>
  );
}
export default WorkingWithObjects;