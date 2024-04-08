import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
export const createQuiz = async (courseId : string, quiz : any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    console.log("response from createQuiz", response.data);
    return response.data;
};
export const deleteQuiz = async (quizId : string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz : any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz.quizId}`, quiz);
    return response.data;
};
export const findQuizzesForCourse = async (courseId : string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
