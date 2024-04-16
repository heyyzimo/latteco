import {createSlice} from '@reduxjs/toolkit';

interface QuizType {
    id: string;
    course: string;
    title: string;
    due: string;
    availableFrom: string;
    availableUntil: string;
    points: number;
    quizType: string; // Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
    assignmentGroup: string; //Quizzes (default), Exams, Assignments, Project
    shuffleAnswers: boolean; // true (default), false
    timeLimit: number; // 20 min(default)
    multipleAttempts: boolean; // false (default), true
    showCorrectAnswers: boolean; // false (default), true. If true, set when correct answers are shown to students.
    accessCode: string; // Default: blank. If set, students must enter the access code to take the quiz.
    oneQuestionAtATime: boolean; // true(default)
    webCamRequired: boolean; // false(default)
    lockquestionsAfterAnswered: boolean; // false(default)
    published: boolean; // false(default)
}

const initialState = {
    quizzes: [] as QuizType[],
    quiz: {
        id: '000',
        title: 'New Quiz 123',
        course: 'RS000',
        due: new Date().toISOString().split('T')[0],
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date().toISOString().split('T')[0],
        points: 100,
        quizType: 'Graded Quiz',
        assignmentGroup: 'Quizzes',
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: false,
        accessCode: '',
        oneQuestionAtATime: true,
        webCamRequired: false,
        lockquestionsAfterAnswered: false,
        published: false,
    }
};

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            const newQuizzes = [
                ...state.quizzes,
                {...action.payload, id: new Date().getTime().toString()},
            ];
            state.quizzes = newQuizzes;
            state.quiz = {
                id: '000',
                title: 'New Quiz 123',
                course: 'RS000',
                due: new Date().toISOString().split('T')[0],
                availableFrom: new Date().toISOString().split('T')[0],
                availableUntil: new Date().toISOString().split('T')[0],
                points: 100,
                quizType: 'Graded Quiz',
                assignmentGroup: 'Quizzes',
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                showCorrectAnswers: false,
                accessCode: '',
                oneQuestionAtATime: true,
                webCamRequired: false,
                lockquestionsAfterAnswered: false,
                published: false,
            };
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz.id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            const newQuizzes = state.quizzes.map((quiz) => {
                if (quiz.id === action.payload.id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
            state.quizzes = newQuizzes;
            state.quiz = {
                id: '000',
                title: 'New Quiz 123',
                course: 'RS000',
                due: new Date().toISOString().split('T')[0],
                availableFrom: new Date().toISOString().split('T')[0],
                availableUntil: new Date().toISOString().split('T')[0],
                points: 100,
                quizType: 'Graded Quiz',
                assignmentGroup: 'Quizzes',
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                showCorrectAnswers: false,
                accessCode: '',
                oneQuestionAtATime: true,
                webCamRequired: false,
                lockquestionsAfterAnswered: false,
                published: false,
            };
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
    }
});
export const {addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes} = quizzesSlice.actions;
export default quizzesSlice.reducer;