import {createSlice} from '@reduxjs/toolkit';
import {Course} from './client';

const initialState = {
    courses: [] as Course[],
    course: {
        id: '000',
        name: 'New Course',
        number: 'New Number',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        image: '',
        description: '',
        credits: 0,
    }
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        addCourse: (state, action) => {
            state.courses = [
                ...state.courses,
                {...action.payload, id: new Date().getTime().toString()}
            ];
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(
                (course) => course.id !== action.payload // expect the payload to be courseId
            );
        },
        updateCourse: (state, action) => {
            state.courses = state.courses.map((course) => {
                if (course.id === action.payload.id) {
                    return action.payload;
                } else {
                    return course;
                }
            });
        }
    }
});
export const {setCourses, setCourse, addCourse, deleteCourse, updateCourse} = coursesSlice.actions;
export default coursesSlice.reducer;

