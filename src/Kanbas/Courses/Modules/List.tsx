import React, { useEffect, useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
function ModuleList() {
  const { courseId } = useParams();
  const handleAddModule = () => {
    client.createModule(courseId!, module).then((module) => {
      dispatch(addModule({...module, course: courseId}));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };


  useEffect(() => {
    client.findModulesForCourse(courseId!)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const modules = useSelector((state: KanbasState) => state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => state.modulesReducer.module);
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(modules[0]); //set the first module as the default selected module

  
  return (
    <>
      {/* <!-- Add buttons here --> */}      
      <div >
        <button className="btn btn-outline-secondary">Collapse All</button>
        <button className="btn btn-outline-secondary">Expand All</button>
        <button className="btn btn-outline-secondary">View Progress</button>
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <FaRegCheckCircle style={{ color: 'green' }}/> 
            Publish All
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
        </div>
        <button className="btn btn-danger wd-redbutton">+Module</button>
        <button className="btn btn-outline-secondary float-end"><FaEllipsisV className="me-2" /></button>
      </div>
      <hr/>
     { /* Module Lists */}
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="d-flex">
            <div className="flex-grow-1">
              <input 
              value={module.name}
              className="form-control"
              onChange={(e) => dispatch(setModule({
                ...module, name: e.target.value }))}
              />
              <textarea 
              className="form-control"
              value={module.description}
              onChange={(e) => dispatch(setModule({
                ...module, description: e.target.value }))}
              />
            </div>
            <div >
            <button className= "btn wd-bluebutton" onClick={handleUpdateModule}>Update</button>
            <button className="btn btn-success wd-greenbutton"  onClick={handleAddModule}>Add</button>
            </div>
          </div>
          
        </li>

        {/* fetch the modules that match the courseId.*/}
        {modules.filter((module) => module.course === courseId).map((module, index) => (
          <li key={index}
            className="list-group-item container"
            onClick={() => setSelectedModule(module)}> {/* set the selected module to the current module*/}
            <div className="row">
              <div className="d-flex g-0">
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="ms-auto">
              <button
              className="btn btn-sm btn-danger wd-redbutton"
              onClick={() => handleDeleteModule(module._id)}>
              Delete
              </button>
              <button
              className="btn btn-sm btn-success wd-greenbutton"
              onClick={(event) => { dispatch(setModule(module)) }}>
              Edit
            </button>

                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
              </div>
              
            </div>
            <div className="row">
            {selectedModule._id === module._id && (
              <ul className="list-group ">
                {module.lessons?.map((lesson : any, index : number) => (
                  <li className="list-group-item " key={index}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;