import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz, setQuiz } from "../../quizzesReducer";
import "./index.css";
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { KanbasState } from '../../../../store';

export default function QuizDetails(
){  
    const { courseId, quizId } = useParams();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    let currentQuiz = quizzes.find((quiz) => quiz.id === quizId);
    console.log('inDetails -- quiz:', quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(quiz.title);
    const [description, setDescription] = useState(quiz.description);
    const [points, setPoints] = useState(quiz.points);
    const [due, setDue] = useState(quiz.due);
    const [availableFrom, setAvailableFrom] = useState(quiz.availableFrom);
    const [availableUntil, setAvailableUntil] = useState(quiz.availableUntil);
    const [quizType, setQuizType] = useState(quiz.quizType);
    const [assignmentGroup, setAssignmentGroup] = useState(quiz.assignmentGroup);
    const [shuffleAnswers, setShuffleAnswers] = useState(quiz.shuffleAnswers);
    const [webCamRequired, setWebCamRequired] = useState(quiz.webCamRequired);
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz.oneQuestionAtATime);
    const [lockquestionsAfterAnswered, setLockquestionsAfterAnswered] = useState(quiz.lockquestionsAfterAnswered);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(quiz.showCorrectAnswers);
    const [showCorrectAnswersInHours, setShowCorrectAnswersInHours] = useState(quiz.showCorrectAnswersInHours);
    const [hasTimeLimit, setHasTimeLimit] = useState(quiz.hasTimeLimit);
    const [timeLimit, setTimeLimit] = useState(quiz.timeLimit);
    const [multipleAttempts, setMultipleAttempts] = useState(quiz.multipleAttempts);
    const [accessCode, setAccessCode] = useState(quiz.accessCode);
    console.log('quiz111.....:', quiz);
    // description
    const [editor, setEditor] = useState(quiz.description);
    const handleSave = async () => {
        const updatedQuiz = {
            ...quiz,
            title,
            description,
            points,
            due,
            availableFrom,
            availableUntil,
            quizType,
            assignmentGroup,
            shuffleAnswers,
            webCamRequired,
            oneQuestionAtATime,
            lockquestionsAfterAnswered,
            showCorrectAnswers,
            showCorrectAnswersInHours,
            hasTimeLimit,
            timeLimit,
            multipleAttempts,
            accessCode
        };
        const status = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizzesDetails/${quizId}`);
    };
    const handleSaveAndPublish = async () => {
        const published = {...quiz, published: true};
        const updatedQuiz = {
            ...published,
            title,
            description,
            points,
            due,
            availableFrom,
            availableUntil,
            quizType,
            assignmentGroup,
            shuffleAnswers,
            webCamRequired,
            oneQuestionAtATime,
            lockquestionsAfterAnswered,
            showCorrectAnswers,
            showCorrectAnswersInHours,
            hasTimeLimit,
            timeLimit,
            multipleAttempts,
            accessCode
        };
        console.log('Updated & published Quiz:', updatedQuiz);
        const status = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };
    useEffect( () => {
        client.findQuizById(quizId!)
        .then((quiz) =>
            dispatch(setQuiz(quiz)));
    }, [courseId]);
    console.log('quiz:', quiz);
    // console.log('title:', currentQuiz.title);
    return (
        
        <div className="container mt-3">
            <h1>Quiz Details</h1>
            <form>
                <div>
                    <input type="text" style={{width: `50%`}}className="form-control" id="quiz-name" defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
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
                            setDescription(data);
                          }}
                        />
                </div>
                <div className="mb-3 container">
                    <div className='row text-end'>
                        <div className='col-3'>
                            <label htmlFor="quiz-type" className="form-label">Quiz Type</label>
                        </div>
                        <div className='col-9 '>
                            <select className="form-select" id="quiz-type" value={quiz.quizType} style={{width:"50%"}}
                            onChange={(e) => setQuizType(e.target.value)}
                            >
                                <option >Graded Quiz</option>
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
                            <select className="form-select" id="quiz-type" style={{width:"50%"}} value={quiz.assignmentGroup}
                            onChange={(e) => setAssignmentGroup(e.target.value)}
                            >
                                <option >Quizzes</option>
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
                        <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                        checked={quiz.shuffleAnswers} 
                        onChange={(e) => setShuffleAnswers(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="shuffle-answers">
                        Shuffle Answers
                        </label>
                        </div>                
                    </div>
                    {/*Webcam Required*/}
                    <div className='row text-start mt-1'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                        <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                        checked={quiz.webCamRequired}
                        onChange={(e) => setWebCamRequired(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="shuffle-answers">
                        Webcam Required
                        </label>
                        </div>                
                    </div>
                    {/*One Question at a Time*/}
                    <div className='row text-start mt-1'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                        <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                        checked={quiz.oneQuestionAtATime}
                        onChange={(e) => setOneQuestionAtATime(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="shuffle-answers">
                        One Question at a Time
                        </label>
                        </div>                
                    </div>
                    {/*Lock Question After Answering*/}
                    <div className='row text-start mt-1'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                        <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                        checked={quiz.lockquestionsAfterAnswered}
                        onChange={(e) => setLockquestionsAfterAnswered(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="shuffle-answers">
                        Lock Question After Answering
                        </label>
                        </div>                
                    </div>
                    {/*Show Correct Answer & When*/}
                    <div className='row text-start mt-3'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                            <div className='input-group'>
                                <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                                checked={quiz.showCorrectAnswers}
                                onChange={(e) => setShowCorrectAnswers(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="shuffle-answers">
                                Show Correct Answers in
                                </label>
                                <input type="number" className="form-control-sm wd-small-input ms-3 me-3"
                                onChange={(e) => setShowCorrectAnswersInHours(e.target.value)}
                                />
                                <label>Hours</label>
                            </div>
                        </div>                
                    </div>
                    {/*Time Limit*/}
                    <div className='row text-start mt-3'>
                        <div className='col-3'>
                        </div>
                        <div className='col-9 '>
                            <div className='input-group'>
                                <input className="form-check-input me-3" type="checkbox" id="shuffle-answers"
                                value={quiz.hasTimeLimit}
                                onChange={(e) => setHasTimeLimit(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="shuffle-answers">
                                Time Limit
                                </label>
                                <input type="text" className="form-control-sm wd-small-input ms-3 me-3" 
                                value={quiz.timeLimit}
                                onChange={(e) => setTimeLimit(e.target.value)}
                                />
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
                                <input className="form-check-input" type="checkbox" id="multiple-attempts"
                                value={quiz.multipleAttempts}
                                onChange={(e) => setMultipleAttempts(e.target.checked)}
                                />
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
                        <input type="number" className="form-control float-right" id="points"  defaultValue={quiz.points}
                        onChange={(e) => setPoints(e.target.value)}
                        />
                        </div>
                    </div>
                    {/*Access Code*/}
                    <div className='row text-end mt-3'>
                        <div className='col-3'>
                            <label>Access Code</label>
                        </div>
                        <div className='col-9'>
                        <input type="number" className="form-control float-right" id="points"  defaultValue={quiz.accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        />
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
                              <input type="date" className="form-control" aria-label="Due date" id="dueDate"  defaultValue={quiz.due}
                              onChange={(e) => setDue(e.target.value)}
                              />
                            </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="col">
                            <label htmlFor="startdate" className="form-label wd-bold-text" >Available from</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="availableFrom" defaultValue={quiz.availableFrom}
                              onChange={(e) => setAvailableFrom(e.target.value)}
                              />
                              {/*<button className="btn btn-outline-secondary" type="button">
                                <FaCalendarAlt /> </button>*/}
                            </div>
                          </div>
                          <div className="col">
                          <label htmlFor="enddate" className="form-label wd-bold-text" >Until</label>
                            <div className="input-group">
                              <input type="date" className="form-control" id="until"  defaultValue={quiz.availableUntil}
                              onChange={(e) => setAvailableUntil(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>                          
                        </div>
                      </div>
                                              </div>                
                    </div>
                    <hr/>
                    <div>
                    <button type="button" className="btn wd-redbutton ms-2 float-end"
                    onClick={handleSave}
                    >
                    Save
                    </button>
                    <button type="button" className="btn wd-greybutton ms-2 float-end"
                    onClick={handleSaveAndPublish}
                    >
                    Save & Publish
                    </button>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`} className="btn wd-greybutton float-end">
                        Cancel
                    </Link>
                    </div>
                </div>
            
            </form>
            
        </div>
    );
}