import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz, setQuiz } from "../../quizzesReducer";
import "./index.css";
import React from 'react';

export default function QuizDetails(
    currentQuiz: any
){
    const [editor, setEditor] = React.useState(currentQuiz.description);

    return (
        <div className="container mt-3">
            <h1>Quiz Details</h1>
            <form>
                <div>
                    <input type="text" style={{width: `50%`}}className="form-control" id="quiz-name" defaultValue={currentQuiz.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="quiz-instructions" className="form-label">Quiz Instructions:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={editor}  
                        onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);}}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditor(data);
                          }}
                        />
                </div>
                <div className="mb-3 container">
                    <div className='row text-end'>
                        <div className='col-3'>
                            <label htmlFor="quiz-type" className="form-label">Quiz Type</label>
                        </div>
                        <div className='col-9 '>
                            <select className="form-select" id="quiz-type" style={{width:"50%"}}>
                                <option selected>Graded Quiz</option>
                                <option >Practice Quiz</option>
                                <option >Graded Survey</option>
                                <option >Ungraded Survey</option>
                            </select>
                        </div>
                    
                    </div>
                    <div className='row text-end mt-2'>
                        <div className='col-3'>
                            <label htmlFor="quiz-type" className="form-label">Assignment Group</label>
                        </div>
                        <div className='col-9 '>
                            <select className="form-select" id="quiz-type" style={{width:"50%"}}>
                                <option selected>Quizzes</option>
                                <option >Exams</option>
                                <option >Assignments</option>
                                <option >Projects</option>
                            </select>
                        </div>
                    </div>
                    {/*Options*/}
                    {/*Label*/}
                    <div className='row text-start mt-3'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                            <label className='form-label' style={{fontWeight:'bold'}}>Options</label>
                        </div>                
                    </div>
                    {/*Shuffle Answers*/}
                    <div className='row text-start mt-1'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                        <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"/>
                        <label className="form-check-label" htmlFor="shuffle-answers">
                        Shuffle Answers
                        </label>
                        </div>                
                    </div>
                    {/*Time Limit*/}
                    <div className='row text-start mt-3'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                            <div className='input-group'>
                                <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"/>
                                <label className="form-check-label" htmlFor="shuffle-answers">
                                Time Limit
                                </label>
                                <input type="text" className="form-control-sm wd-small-input ms-3 me-3"  />
                                <label>Minutes</label>
                            </div>
                        </div>                
                    </div>
                    {/*Multiple Attempts*/}
                    <div className='row text-start mt-3'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                        <div className="form-check wd-card">
                            <div className='wd-card-body'>
                                <input className="form-check-input" type="checkbox" id="multiple-attempts"/>
                                <label className="form-check-label" htmlFor="multiple-attempts">
                                    Allow Multiple Attempts
                                </label>    
                            </div>
                        </div>
                    </div>                
                    </div>
                    {/*Points*/}
                    <div className='row text-end mt-3'>
                        <div className='col-3'>
                            <label>Points</label>
                        </div>
                        <div className='col-9'>
                        <input type="number" className="form-control float-right" id="points"  defaultValue={currentQuiz.points}/>
                        </div>
                    </div>
                    {/*Assign*/}
                    <div className='row text-end mt-3 mb-4'>
                        <div className='col-3'>
                            <label htmlFor="quiz-type" className="form-label">Assign</label>
                        </div>
                        <div className='col-9 text-start'>
                        <div className="wd-card">
                        <div className="wd-card-body">
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label wd-bold-text" >Assign to</label>
                            <div className="input-group">
                              <input type="text" className="form-control" aria-label="Due date" id="assignTo"  />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label wd-bold-text" >Due</label>
                            <div className="input-group">
                              <input type="date" className="form-control" aria-label="Due date" id="dueDate"  defaultValue={currentQuiz.due}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="col">
                            <label htmlFor="startdate" className="form-label wd-bold-text" >Available from</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="availableFrom" defaultValue={currentQuiz.availableFrom}/>
                              {/*<button className="btn btn-outline-secondary" type="button">
                                <FaCalendarAlt /> </button>*/}
                            </div>
                          </div>
                          <div className="col">
                          <label htmlFor="enddate" className="form-label wd-bold-text" >Until</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="until"  defaultValue={currentQuiz.availableUntil}/>
                            </div>
                          </div>
                        </div>                          
                        </div>
                      </div>
                                              </div>                
                    </div>
                    <hr/>
                    

                </div>
            
            </form>
            
        </div>
    );
}