import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;

export interface Course {
    id: String, 
    name: String, 
    number: String,
    startDate: Date, 
    endDate: Date,
    image: String,
    department: String,
    description: String,
    credits: Number,
}

const api = axios.create({
    withCredentials: true
});

export const findAllCourses = async () => {
    const response = await api.get(COURSES_API);
    return response.data;
}

export const addNewCourse = async(course : Course) => {
    const response = await api.post(COURSES_API, course);
    return response.data;
}
// will return a status 204
export const deleteCourse = async(courseId: String) => {
    const response = await api.delete(
      `${COURSES_API}/${courseId}`
    );
    return response.data;
}
// return a status 204
export const updateCourse = async(course : Course) => {
    const response = await api.put(
      `${COURSES_API}/${course.id}`,course
    );
    return response.data;
}