import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the Todo interface -- by myself. Or the todo is considered type 'never'
interface Todo {
    id: number; // Use `string` if your IDs are strings
    title: string;
    completed: boolean;
    description: string;
    due: any;
    // Include other properties if needed
  }
  
function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);

    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<Todo[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
      };
    const fetchTodos = async () => {
      const response = await axios.get(API);
      setTodos(response.data);
      console.log(response.data);
    };
    const deleteTodo = async (todo : Todo) => {
        try{
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error : any){
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

      };
    
    const removeTodo = async (todo:Todo) => {
        const response = await axios
          .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
      };
    const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
    };
    const fetchTodoById = async (id : number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    // new version of updating 
    const updateTodo = async () => {
        try{
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t))); //update the local todo list
        } catch (error : any){
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
      };
    
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
      };
    
    
    
    
    useEffect(() => {
      fetchTodos();
    }, []);
  

    return (
      <div>
        {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
        <h3>Working with Arrays</h3>
        <input className="form-control" style={{ width: '50%' }} type="number" value={todo.id} 
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        
        <input className="form-control" style={{ width: '50%' }} type="text" value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>

        <textarea value={todo.description} className="form-control" style={{ width: '50%'}} rows={3}
            onChange={(e) => setTodo({ ...todo,
            description: e.target.value })} />
        <input value={todo.due} type="date"className="form-control" style={{ width: '50%'}}
            onChange={(e) => setTodo({
            ...todo, due: e.target.value })} />
        <label>
        <input checked={todo.completed} type="checkbox"
        onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
            Completed
        </label>
        <br/>
        <button className="btn wd-bluebutton my-1" onClick={postTodo}> Post Todo </button><br/>

        <button className="btn wd-bluebutton my-1" style={{width : '70%'}} onClick={createTodo} >
        Create Todo
        </button>
        <button className="btn wd-greenbutton my-1" style={{width : '70%'}} onClick={updateTodo} >
        Update Todo
        </button>
        
        {/*<button onClick={fetchTodos} > Fetch todos </button> */}

        <ul className="list-group" style={{width : '70%'}}>
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            {/* 
            <button className="btn wd-redbutton ms-3" onClick={() => removeTodo(todo)} >
            Remove
            </button>
            */}
            <button onClick={() => deleteTodo(todo)} className="btn wd-redbutton float-end ms-2">
                Delete
            </button>
            <button  className="btn wd-yellowbutton ms-3 float-end" onClick={() => fetchTodoById(todo.id)} >
            Edit
            </button>
          </li>
        ))}
        </ul>
        <h3>Updating an Item in an Array</h3>
        <a className="btn wd-bluebutton" href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>

        <h3>Update completed status</h3>
        <label>Todo id</label>
        <input className="form-control" style={{ width: '50%' }} type="number" value={todo.id} 
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        <label>Completed</label>
        <input type="checkbox" 
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        checked = {todo.completed}/>
        <a className="btn wd-bluebutton" href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Update Complete Status
        </a>

        <h3>Update description </h3>
        <label>Todo id</label>
        <input className="form-control" style={{ width: '50%' }} type="number" value={todo.id} 
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        <label>Completed</label>
        <input className="form-control" style={{ width: '50%' }} type="text" value={todo.description} 
        onChange={(e) => setTodo({
          ...todo, description: e.target.value})}/>
        <a className="btn wd-bluebutton" href={`${API}/${todo.id}/description/${todo.description}`}>
        Update Complete Status
        </a>
        <h4>Retrieving Arrays</h4>
        <a className="btn wd-bluebutton" href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
        <a className="btn wd-bluebutton" href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>
        <h4>Filtering Array Items</h4>
        <a className="btn wd-bluebutton" href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        <h4>Creating new Items in an Array</h4>
        <a className="btn wd-bluebutton" href={`${API}/create`}>
            Create Todo
        </a>
        <h4>Deleting from an Array</h4>
        <a className="btn wd-bluebutton" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>


      </div>
    );
  }
  export default WorkingWithArrays;