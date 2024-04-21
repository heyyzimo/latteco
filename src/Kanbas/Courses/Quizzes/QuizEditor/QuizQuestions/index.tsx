import FillInBlank from "./FillInBlanksEditor";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalse from "./TrueFalse";

export default function QuizQuestions(
    currentQuiz: any
){
    return (
        <div>
            <h1>Quiz Questions</h1>
            <MultipleChoiceQuestionEditor/>
            <FillInBlank/>
            <TrueFalse/>
            
        </div>
    );
}