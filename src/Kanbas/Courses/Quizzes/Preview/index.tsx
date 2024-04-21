// function QuizPreview(){

//     return (
//         <div>
//             <h1>Quiz Preview</h1>
//         </div>
//     )
// }
// export default QuizPreview;

import React from "react";
import { CAlert } from "@coreui/react";
//import { cilUser } from '@coreui/icons-react';
import { cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FaCaretRight } from "react-icons/fa";
import { SlQuestion } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
 
// Type declarations for your Redux state and actions would go here
// import { fetchQuestions, setAnswer, submitQuiz } from './quizActions';
 
const QuizPreview: React.FC = () => {
  // Here you would normally call useSelector to access your Redux state
  // const quiz = useSelector((state: AppState) => state.quiz);
 
  // Dummy quiz data
  const quiz = {
    item_name: "Example Quiz",
    available_from_date: new Date().toISOString(),
    questions: [
      {
        _id: "q1",
        title: "Question 1 Title",
        questionText: "This is question 1 text",
        questionType: "M",
        points: 5,
        possibleAnswers: ["Answer 1", "Answer 2", "Answer 3"],
        previewAnswer: "",
      },
      // More questions...
    ],
  };
 
  // Dummy function to replace useDispatch actions
  const handleAnswerChange = (index: number, answer: string) => {
    console.log(`Answer for question ${index} changed to: ${answer}`);
  };
 
  const handleSubmit = () => {
    console.log("Submit quiz");
    // Dispatch submitQuiz action
  };
 
  return (
    <div
      className="container-fluid"
      style={{ marginTop: "20px", marginLeft: "25px", marginRight: "20px" }}
    >
      <h1>{quiz.item_name}</h1>
      <CAlert color="danger" className="d-flex align-items-center">
        <CIcon
          icon={cilWarning}
          className="flex-shrink-0 me-2"
          width={24}
          height={24}
        />
        <div>This is a preview of the published version of the quiz</div>
      </CAlert>
 
      {/* ... rest of the component follows your provided structure ... */}
 
      {/* Assuming you're mapping over questions like in your provided code */}
      {quiz.questions.map((question, index) => (
        <div
          key={question._id}
          className="card"
          style={{ marginBottom: "20px" }}
        >
          {/* Question header and body as per your provided structure */}
        </div>
      ))}
 
      {/* Submit button and "Keep Editing" link */}
      <div className="card-body text-end">
        <a role="button" className="btn btn-light" onClick={handleSubmit}>
          Submit Quiz <FaCaretRight />
        </a>
      </div>
      <Link to={`/edit-quiz/${quiz.item_name}`} className="btn btn-light">
        {/* < style={{ marginRight: "5px" }} /> */}
        Keep Editing This Quiz
      </Link>
 
      {/* Question navigation at the bottom */}
      <div>
        <h4 className="mt-3 ms-3">Questions</h4>
        {quiz.questions.map((question, index) => (
          <div key={question._id} className="mt-1 ms-4 list-group-item">
            <SlQuestion className="me-1" />
            <span>Question {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default QuizPreview;