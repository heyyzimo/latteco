import exp from "constants"
import Quizzes from "..";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz, setQuiz } from "../quizzesReducer";
import { useEffect } from "react";
import * as client from "../client";

function QuizzesDetails(){
    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    console.log('quizId:', quizId);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quizList = quizzes.filter(
        (quiz) => quiz.course === courseId);
    //console.log('quizzes:', quizzes);
    let currentQuiz = quizList.find((quiz) => quiz.quizId === quizId);
    if (currentQuiz === undefined) {
        currentQuiz = quiz;
    }
    console.log('currentQuiz:', currentQuiz);
    const navigate = useNavigate();
    const handlePublishButton = async (quiz : any) => {
        const updatedQuiz = {...quiz, published: !quiz.published};
        const status = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    }
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
            <button className={`btn btn-outline-secondary ${ currentQuiz.published ? `wd-greenbutton` : `wd-greybutton`} me-1`}
            onClick={() => handlePublishButton(currentQuiz)}
            >
            {
                currentQuiz.published ? <FaCheckCircle style={{color:'white'}}/> : <FaBan style={{color:'grey'}}/>
            } 
            {
                currentQuiz.published ? 'Published' : 'Unpublished'
            }
            </button>
            <button className="btn btn-outline-secondary me-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizPreview/${quizId}`)}> Preview</button>
            <button className="btn btn-outline-secondary me-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`)}><FaPen/> Edit</button>
            <button className="btn btn-outline-secondary  me-1"><FaEllipsisV className="me-2" /></button>
        </div>
       </div>
       <hr/>
       <div className="container ">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{currentQuiz.title}</h5>
      <div className="row">
        <div className="col-md-4 text-end mt-2">
          <p><strong>Quiz Type:</strong></p>
          <p><strong>Points:</strong> </p>
          <p><strong>Assignment Group:</strong> </p>
          <p><strong>Shuffle Answers:</strong> </p>
          <p><strong>Time Limit:</strong> </p>
          <p><strong>Multiple Attempts:</strong> </p>
          <p><strong>Show Correct Answers:</strong></p>
          <p><strong>One Question at a Time:</strong> </p>
          <p><strong>Webcam Required:</strong> </p>
        </div>
        <div className="col-md-8 mt-2">
            <p>{currentQuiz.quizType}</p>
            <p>{currentQuiz.points}</p>
            <p>{currentQuiz.assignmentGroup}</p>
            <p>{currentQuiz.shuffleAnswers ? `Yes` : `No`}</p>
            <p>{currentQuiz.timeLimit} Minutes</p>
            <p>{currentQuiz.multipleAttempts ? `Yes` : `No`}</p>
            <p>{currentQuiz.showCorrectAnswers ? `Yes` : `No`}</p>
            <p>{currentQuiz.oneQuestionAtATime ? `Yes` : `No`}</p>
            <p>{currentQuiz.webCamRequired ? `Yes` : `No`}</p>
        </div>

      </div>
      <div className="row">
      <hr/>
        <div className="col">
          <p><strong>Due:</strong> </p>
          <p>{currentQuiz.due}</p>
        </div>
        <div className="col">
          <p><strong>For:</strong> </p>
          <p>Everyone</p>
        </div>
        <div className="col">
          <p><strong>Available from:</strong> </p>
          <p>{currentQuiz.availableFrom}</p>
        </div>
        <div className="col">
          <p><strong>Until:</strong> </p>
          <p>{currentQuiz.availableUntil}</p>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )

}
export default QuizzesDetails;

