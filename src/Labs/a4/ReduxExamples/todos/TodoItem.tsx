import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
function TodoItem({todo}: any) {
  const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item">
        {todo.title}
        <button onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
        <button onClick={() => dispatch(setTodo(todo))}> Edit </button> 
      </li>
    );
  }
  export default TodoItem;
    