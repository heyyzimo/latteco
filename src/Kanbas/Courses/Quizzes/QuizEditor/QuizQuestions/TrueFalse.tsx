import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";


export interface Answer {
  answerId: string;
  text: string;
  questionId: string;
}
 
export interface QuestionEditorState {
  questionId: string;
  title: string;
  points: number;
  questionText: string;
  possibleAnswers: Answer[];
  correctAnswer: string; //"true" or "false"
  questionType: string; //M for multiple choice, T for true/false, B for fill in the blank
  quizId: string;
}
 
export default function TrueFalse() {
  const [state, setState] = useState<QuestionEditorState>({
    questionId: "question111",
    title: "",
    points: 1,
    questionText: "",
    possibleAnswers: [
      { answerId: "a1", text: "Example anwser 1", questionId: "question111" },
      { answerId: "a2", text: "Example answer 2", questionId: "question111" },
    ],
    correctAnswer: "",
    questionType: "M",
    quizId: "quiz1",
  });

  const handleAnswerChange = (text: any, index: any) => {
    const newAnswers = [...state.possibleAnswers];
    newAnswers[index].text = text;
    setState({ ...state, possibleAnswers: newAnswers });
  };
 
  const handleSelectCorrectAnswer = (id: any) => {
    setState({ ...state, correctAnswer: id });
  };
 
  const handleRemoveAnswer = (index: any) => {
    const newAnswers = [...state.possibleAnswers];
    newAnswers.splice(index, 1);
    setState({ ...state, possibleAnswers: newAnswers });
  };
 
  return (
    <div className="container-fluid me-3 ms-3">
      {/* Row for Title and Points */}
      <div className="row pt-3">
        <div className="col-4">
          <input
            className="form-control"
            type="text"
            value={state.title}
            onChange={() => {}}
            placeholder="Question Title"
          />
        </div>
        <div className="col-4">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              True/False
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Multiple choice</Dropdown.Item>
              <Dropdown.Item href="#/action-2">True/False</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Fill in the Blank{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
 
        <div className="col-3 d-inline-flex align-items-center">
          <span className="fs-5 me-2">pts:</span>
          <input
            className="form-control"
            type="number"
            value={state.points}
            onChange={() => {}}
            placeholder="Points"
            style={{ width: "auto" }}
          />
        </div>
      </div>
      <hr />
      <h5 className="text-muted-question">
        Enter your question and multiple answers, then select the one correct
        answer
      </h5>
  
      <b>Question:</b>
      <h5 className="text-muted-question">
        Edit  &nbsp; View &nbsp;  Insert &nbsp;  Format &nbsp;  Tools &nbsp;  Table&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100%
      </h5>

      <div className="row pt-3">
        <div className="col">
          <ReactQuill
            className="custom-quill form-control"
            id="myCustomQuillEditorQuestion"
            value={state.questionText}
            onChange={() => {}}
            placeholder="Enter your question text here..."
          />
        </div>
      </div>
 
      <div className="row pt-3">
  <strong>Answers:</strong>
  <div className="col-6 input-group mb-3">
    <span>Correct Answer:</span> <br/>
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="trueAnswerCheckbox"
        checked={state.correctAnswer === 'true'} // Assume correctAnswer is a string "true" or "false"
      />
      <label className="form-check-label" htmlFor="trueAnswerCheckbox">
        True
      </label>
      <br/>
      <input
        className="form-check-input"
        type="checkbox"
        id="trueAnswerCheckbox"
        checked={state.correctAnswer === 'true'} // Assume correctAnswer is a string "true" or "false"
      />
      <label className="form-check-label" htmlFor="trueAnswerCheckbox">
        False
      </label>
    </div>
  </div>

        
      </div>
 
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn btn-custom-red-addquestion"
          type="button"
          style={{ flex: "0 1 auto" }}
          onClick={() => {}}
        >
          <FaPlus /> Add Another Answer
        </button>
      </div>
 
      <div className="row pt-3">
        <div className="col">
          <button className="btn me-2" type="button" onClick={() => {}}>
            Cancel
          </button>
          <button
  className="btn"
  type="button"
  onClick={() => {}}
  style={{ backgroundColor: 'red', color: 'white' }}
>
  Update Question
</button>

        </div>
      </div>
    </div>
  );
}