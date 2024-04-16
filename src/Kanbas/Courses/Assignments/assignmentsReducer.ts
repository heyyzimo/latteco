import {createSlice} from '@reduxjs/toolkit';

interface AssignmentType {
    id: string;
    title: string;
    description: string;
    due: string;
    availableFrom: string;
    availableUntil: string;
    points: number;
    course: string;
}

const initialState = {
    assignments: [] as AssignmentType[],
    assignment: {
        _id: '000',
        title: 'New Assignment 123', 
        description: 'New Description',
        due:new Date().toISOString().split('T')[0],
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date().toISOString().split('T')[0],
        points: 100,
        course: 'RS000',    
    }};

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            const newAssignments = [
                ...state.assignments,
                {...action.payload, id: new Date().getTime().toString()},
            ]
            state.assignments = newAssignments;
            /*
            state.assignment = {
                _id: '000',
                title: 'New Assignment 123', 
                description: 'New Description',
                due:new Date().toISOString().split('T')[0],
                availableFrom: new Date().toISOString().split('T')[0],
                availableUntil: new Date().toISOString().split('T')[0],
                points: 100,
                course: 'RS000',    
            }*/
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment.id !== action.payload // expect the payload to be _id 
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
            if (assignment.id === action.payload.id) {
                return action.payload;
            } else {
                return assignment;
            }
            });
            /*
            state.assignment = {
                _id: '000',
                title: 'New Assignment 123', 
                description: 'New Description',
                due:new Date().toISOString().split('T')[0],
                availableFrom: new Date().toISOString().split('T')[0],
                availableUntil: new Date().toISOString().split('T')[0],
                points: 100,
                course: 'RS000',    
            } */
            },
        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
    }
});

export const {addAssignment, deleteAssignment, updateAssignment, selectAssignment, setAssignments} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;