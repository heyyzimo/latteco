import { createSlice } from "@reduxjs/toolkit";
import { Module } from "module";

interface ModuleType {
  id: string;
  name: string;
  description: string;
  course: string;
  lessons: [];
}


const initialState =  {
  modules: [] as ModuleType[],
  module: { id:"000", name: "New Module 123", description: "New Description", course: "RS000", lessons: []},
};


const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      const newModules = [
        action.payload, ...state.modules,
      ];
      state.modules = newModules;
      state.module = { id:"000", name: "New Module 123", description: "New Description", course: "RS000", lessons: []}; // clear the module
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module.id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module.id === action.payload.id) {
          return action.payload;
        } else {
          return module;
        }
      });
      state.module = { id:"000", name: "New Module 123", description: "New Description", course: "RS000", lessons: []}; // clear the module
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setModules: (state, action) => {
      state.modules = action.payload;
    },
  },
});


export const { addModule, deleteModule,
  updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;