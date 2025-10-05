import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import '../css/singleQuestion.css'
import { AnswerOption } from "./AnswerOption";
import arrowLeft from "../img/arrow-left.png"
import arrowRight from "../img/arrow-right.png"
import { option } from "./AnswerOption";
import { QuizObject } from "./QuizCard";
import { useEffect, useState } from "react";
import check from "../img/check.png";
import xRed from "../img/x-red.png";
import xBlack from "../img/x-black.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { stringifyTime } from "../modules/stringifyTime";

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
    const navigate = useNavigate()

    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [answers, setAnswers] = useState<string[]>([])
    const [controlFirst, setControlFirst] = useState<number>(0)


    const [selectedFieldA, setSelectedFieldA] = useState<boolean>(false)
    const [selectedFieldB, setSelectedFieldB] = useState<boolean>(false)
    const [selectedFieldC, setSelectedFieldC] = useState<boolean>(false)
    const [selectedFieldD, setSelectedFieldD] = useState<boolean>(false)

    const [popUp, setPopUp] = useState<boolean>(false);

    const [trueAN, setTrueAN] = useState<number>(0);
    const [wrongAN, setWrongAN] = useState<number>(0);
    const [score, setScore] = useState<number>(0);


    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    let initialCounter = 0;
    const currentQuizDataJSON = localStorage.getItem("currentQuiz");
    if (currentQuizDataJSON) {
        const currentQuizData: QuizObject = JSON.parse(currentQuizDataJSON);
        initialCounter = currentQuizData.time || 0;
    }


    const counterRef = useRef(initialCounter)

    let stringifyTimeResult: string[] = stringifyTime(counterRef.current)
    const [timer, setTimer] = useState<string>(stringifyTimeResult[0] + ":" + stringifyTimeResult[1])

    useEffect(() => {

        const intervalID = setInterval(() => {
            intervalRef.current = intervalID
            if (counterRef.current === 0) {
                clearInterval(intervalID)
                let userAnswers: string[] = answers
                let trueAnswers: number = 0;
                for (let i = 0; i < userAnswers.length; i++) {
                    if (userAnswers[i] === arrayCurrentQuizQuestions[i].correctAnswer)
                        trueAnswers++;
                }
                let falseAnswers: number = userAnswers.length - trueAnswers
                let percantageScore: number = (trueAnswers / userAnswers.length) * 100
                setTrueAN(trueAnswers)
                setWrongAN(falseAnswers)
                setScore(percantageScore)
                setPopUp(true)
                return
            }

            counterRef.current = counterRef.current - 1

            let stringifyTimeResult: string[] = stringifyTime(counterRef.current)
            setTimer(stringifyTimeResult[0] + ":" + stringifyTimeResult[1])


        }, 1000)
    }, [])


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
    else {

        return <div></div>
    }


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
            let userAnswers: string[] = answers
            let trueAnswers: number = 0;
            for (let i = 0; i < userAnswers.length; i++) {
                if (userAnswers[i] === arrayCurrentQuizQuestions[i].correctAnswer)
                    trueAnswers++;
            }
            let falseAnswers: number = userAnswers.length - trueAnswers
            let percantageScore: number = (trueAnswers / userAnswers.length) * 100
            setTrueAN(trueAnswers)
            setWrongAN(falseAnswers)
            setScore(percantageScore)
            setPopUp(true)
            if (intervalRef.current)
                clearInterval(intervalRef.current)
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
                <div id="topPart"><div>TOPIC OF QUIZ: {currentQuiz.title}</div> <div>Time left: {timer}</div></div>
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

            <div id="resultsBackground" style={{ display: popUp ? "block" : "none" }}></div>
            <div id="resultsContainer" style={{ display: popUp ? "flex" : "none" }}>
                <div id="results-title">QUIZ IS FINISHED</div>
                <div id="results-text">Your result is:</div>
                <div id="results">
                    <div className="result-single">
                        <img src={check} className="result-single-img" />
                        <div className="result-single-text">{trueAN}</div>
                    </div>

                    <div className="result-single">
                        <img src={xRed} className="result-single-img" />
                        <div className="result-single-text">{wrongAN}</div>
                    </div>
                </div>
                <div id="results-peracantage">{score.toFixed(2)}%</div>
                <div id="results-btn" onClick={() => navigate('/my-stats')}>SEE MY STATS</div>
                <img src={xBlack} id="closePopUp" onClick={() => navigate('/single-quiz')} />
            </div>


        </div >
    );
}