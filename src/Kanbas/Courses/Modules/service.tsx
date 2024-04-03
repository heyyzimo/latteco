import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const MODULES_API = "http://localhost:4000/api/modules";
export const deleteModule = async (moduleId : string) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
export const createModule = async (courseId : string, module : any) => {

};
export const findModulesForCourse = async (courseId:string) => {
    
};

