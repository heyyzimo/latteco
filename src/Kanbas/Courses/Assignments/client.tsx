import axios from "axios";
const ASSIGNMENT_API = "http://localhost:4000/api/assignments";
const COURSES_API = "http://localhost:4000/api/courses";
export const findAssignmentsForCourse = async (courseId : string) => {
    const response  = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignment = async (courseId : string, assignment : any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment, assignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId : string) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
}

export const updateAssignment = async (assignment : any) => {
    const response = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return response.data;
}
