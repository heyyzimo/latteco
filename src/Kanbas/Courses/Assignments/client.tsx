import axios from "axios";
const ASSIGNMENT_API = "http://localhost:4000/api/assignments";
const COURSES_API = "http://localhost:4000/api/courses";

const api = axios.create({
    withCredentials: true
});

export const findAssignmentsForCourse = async (courseId : string) => {
    const response = await api.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignment = async (courseId : string, assignment : any) => {
    const response = await api.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId : string) => {
    const response = await api.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
}

export const updateAssignment = async (assignment : any) => {
    const response = await api.put(`${ASSIGNMENT_API}/${assignment.id}`, assignment);
    return response.data;
}
