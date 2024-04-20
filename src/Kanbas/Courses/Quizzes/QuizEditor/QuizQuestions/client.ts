import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const api = axios.create({
    withCredentials: true
});

const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;

const createQuestion = async (quizId : string, question : any) => {
    const response = await api.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
}

const deleteQuestion = async (questionId : string) => {
    const response = await api.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

const updateQuestion = async (question : any) => {
    const response = await api.put(`${QUESTIONS_API}/${question.id}`, question);
    return response.data;
}

const getQuestionsByQuiz = async (quizId : string) => {
    const response = await api.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

const getQuestionById = async (questionId : string) => {
    const response = await api.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}