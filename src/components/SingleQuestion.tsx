import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import '../css/singleQuestion.css'
import { AnswerOption } from "./AnswerOption";
import arrowLeft from "../img/arrow-left.png"
import arrowRight from "../img/arrow-right.png"
import { option } from "./AnswerOption";
import { QuizObject } from "./QuizCard";
import { useState } from "react";


export interface quizQuestion {
    quizID: number;
    questionID: number;
    questionText: string,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    correctAnswer: option
}


export function SingleQuestion() {
    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [answers, setAnswers] = useState<string[]>([])
    const [controlFirst, setControlFirst] = useState<number>(0)


    const [selectedFieldA, setSelectedFieldA] = useState<boolean>(false)
    const [selectedFieldB, setSelectedFieldB] = useState<boolean>(false)
    const [selectedFieldC, setSelectedFieldC] = useState<boolean>(false)
    const [selectedFieldD, setSelectedFieldD] = useState<boolean>(false)



    let currentQuiz: QuizObject;
    let currentQuizJSON: any = localStorage.getItem("currentQuiz")
    if (currentQuizJSON != null) {
        currentQuiz = JSON.parse(currentQuizJSON)
    }
    else
        return <div></div>







    let qustionsData: quizQuestion[]
    let questionsDataJSON: any = localStorage.getItem("arrayQuestions")
    if (questionsDataJSON != null) {
        qustionsData = JSON.parse(questionsDataJSON)
    }
    else
        return <div></div>

    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>




    let arrayCurrentQuizQuestions: quizQuestion[] = [];
    qustionsData.forEach(question => {
        if (currentQuiz.questionsID.includes(question.questionID)) {
            arrayCurrentQuizQuestions.push(question)
        }
    })



    if (controlFirst == 0) {

        let answersArray: string[] = []
        for (let i = 0; i < currentQuiz.questionsID.length; i++) {
            answersArray.push("NO ANSWER")
        }
        setAnswers(answersArray)
        setControlFirst(1)
    }






    function handleChangeQuestion(clickedNextQuestion: boolean) {
        setSelectedFieldA(false)
        setSelectedFieldB(false)
        setSelectedFieldC(false)
        setSelectedFieldD(false)


        if (questionNumber + 1 == arrayCurrentQuizQuestions.length && clickedNextQuestion) {
            alert("Quiz is finished!")

            return
        }


        if (clickedNextQuestion)
            setQuestionNumber(questionNumber + 1)
        else
            setQuestionNumber(questionNumber - 1)
    }



    return (
        <div>
            <Menu user={currentUser} page={pageType.Quizzes} />
            <div id="single-question-content">
                <div id="topPart"><div>TOPIC OF QUIZ: {currentQuiz.title}</div> <div>Time left: 9:23</div></div>
                <div id="questionANDanswersContainer">
                    <div id="questionContainer">{(questionNumber + 1) + ". " + arrayCurrentQuizQuestions[questionNumber].questionText}</div>
                    <div id="answerOptionsContainer">
                        <div className="answerOptionRow">
                            <AnswerOption optionName={option.A} optionContent={arrayCurrentQuizQuestions[questionNumber].optionA} questionNumber={questionNumber} answers={answers} setAnswers={setAnswers} selectedField={selectedFieldA} setSelectedField={setSelectedFieldA} setSelectedFieldA={setSelectedFieldA} setSelectedFieldB={setSelectedFieldB} setSelectedFieldC={setSelectedFieldC} setSelectedFieldD={setSelectedFieldD} />
                            <AnswerOption optionName={option.B} optionContent={arrayCurrentQuizQuestions[questionNumber].optionB} questionNumber={questionNumber} answers={answers} setAnswers={setAnswers} selectedField={selectedFieldB} setSelectedField={setSelectedFieldB} setSelectedFieldA={setSelectedFieldA} setSelectedFieldB={setSelectedFieldB} setSelectedFieldC={setSelectedFieldC} setSelectedFieldD={setSelectedFieldD} />
                        </div>

                        <div className="answerOptionRow">
                            <AnswerOption optionName={option.C} optionContent={arrayCurrentQuizQuestions[questionNumber].optionC} questionNumber={questionNumber} answers={answers} setAnswers={setAnswers} selectedField={selectedFieldC} setSelectedField={setSelectedFieldC} setSelectedFieldA={setSelectedFieldA} setSelectedFieldB={setSelectedFieldB} setSelectedFieldC={setSelectedFieldC} setSelectedFieldD={setSelectedFieldD} />
                            <AnswerOption optionName={option.D} optionContent={arrayCurrentQuizQuestions[questionNumber].optionD} questionNumber={questionNumber} answers={answers} setAnswers={setAnswers} selectedField={selectedFieldD} setSelectedField={setSelectedFieldD} setSelectedFieldA={setSelectedFieldA} setSelectedFieldB={setSelectedFieldB} setSelectedFieldC={setSelectedFieldC} setSelectedFieldD={setSelectedFieldD} />
                        </div>
                    </div>

                </div>
            </div>
            <div id="nextQuestion">
                <div className="currentQuestionNumber">{questionNumber + 1}/{currentQuiz.questionsID.length}</div>
                <img className="nextArrow" src={arrowRight} onClick={() => handleChangeQuestion(true)}></img>
                <div className="currentQuestionText">NEXT</div>
            </div >

            <div id="previousQuestion" style={{ display: questionNumber === 0 ? "none" : "block" }}>
                <div className="currentQuestionNumber">{questionNumber + 1}/{currentQuiz.questionsID.length}</div>
                <img className="nextArrow" src={arrowLeft} onClick={() => handleChangeQuestion(false)}></img>
                <div className="currentQuestionText"> PAST</div>
            </div>


        </div >
    );
}