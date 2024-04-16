import { FaCheckCircle, FaBan, FaPen, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useEffect } from "react";
import { useParams, useNavigate, useLocation, Link, Route, Routes, Navigate } from "react-router-dom";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz, setQuiz } from "../quizzesReducer";
import  QuizDetails  from "./QuizDetails";
import QuizQuestions  from "./QuizQuestions";
import * as client from "../client";


function QuizEditor(){
    const { pathname } = useLocation();
    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    console.log('quiz:', quiz);
    const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    //set currentQuiz
    let currentQuiz = quizzes.find((quiz) => quiz.id === quizId);
    // impossible case but set quiz to initial values if it is undefined (create new quiz)
    if (currentQuiz === undefined) {
        currentQuiz = quiz;
    }
    console.log('currentQuiz:', currentQuiz);
    // fetch the quizzes for the course
    useEffect(() => {
        client.findQuizzesForCourse(courseId!)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
        );
    }, [courseId]);
    return (
        <>
        
        <div className="wd-assignment-buttons d-flex" >

        <div className="ms-auto">
            {/*<button className="btn btn-outline-secondary ">+Group</button>*/}
            {/*navigate to the quizzesdetails page*/}
            <span className="me-2">
                Points {currentQuiz.points}
            </span>
            <span className="me-2">
            {
                currentQuiz.published ? <FaCheckCircle style={{color:'white'}}/> : <FaBan style={{color:'grey'}}/>
            }    
            {
                currentQuiz.published ? 'Published' : 'Not Published'
            }
            </span>
            
            <button className="btn btn-outline-secondary me-1 btn-sm"><FaEllipsisV className="me-2" /></button>
        </div>
       </div>
       <hr/>
       {/*Tabs*/}
       <div className="container mt-3">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={pathname.includes('details') ? 'nav-link active' : 'nav-link'} 
                to={`/Kanbas/Courses/${courseId}/Quizzes/QuizzesDetails/${quiz.id}/details`} data-bs-toggle="tab">Details</Link>
            </li>
            <li className="nav-item">
                <Link className={pathname.includes('questions') ? 'nav-link active' : 'nav-link'}
                to={`/Kanbas/Courses/${courseId}/Quizzes/QuizzesDetails/${quiz.id}/questions`} data-bs-toggle="tab">Questions</Link>
            </li>
        </ul>

       </div>

       {/*Tab Content*/}

        <Routes>
            <Route path="/" element = {<Navigate to={`details`}/>}/>
            <Route path={`details`} element={<QuizDetails />} />
            <Route path={`questions`} element={<QuizQuestions />} />
        </Routes>

        </>

    );

};
export default QuizEditor;