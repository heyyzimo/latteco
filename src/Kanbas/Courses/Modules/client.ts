import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;
const api = axios.create({
    withCredentials: true
}); 

export interface Module {
    id: string,
    name: string,
    course: string,
    lessons: Object[],
}

export const deleteModule = async (moduleId :string ) => {
  const response = await api
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const findModulesForCourse = async (courseId?:string) => {
  const response = await api
    .get(`${COURSES_API}/${courseId}/modules`);
  console.log("fetched modules for the course", response.data);
  return response.data;
  
};
export const createModule = async (courseId : string, module: Module ) => {
    const response = await api.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
};
export const updateModule = async (module : Module) => {
    const response = await api.
      put(`${MODULES_API}/${module.id}`, module);
    return response.data;
  };
  
  
