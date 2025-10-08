import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import "../css/singleQuiz.css"
import starFull from '../img/star-full.png'
import starEmpty from '../img/star-empty.png'
import { QuizObject } from './QuizCard'
import { useNavigate } from "react-router-dom";
import { SingleQuestion, quizTry } from "./SingleQuestion";
import { useRef } from "react";



export let currentQuiz: QuizObject;

export function SingleQuiz() {

    let navigate = useNavigate()
    let currentQuizRef = useRef({})


    let currentQuizJSON: any = localStorage.getItem("currentQuiz")
    if (currentQuizJSON != null) {
        currentQuiz = JSON.parse(currentQuizJSON)
    }
    else
        return <div></div>

    let quizObjects: QuizObject[];

    let currentQuizObjectsJSON: any = localStorage.getItem("quizObjects")
    if (currentQuizObjectsJSON != null) {
        quizObjects = JSON.parse(currentQuizObjectsJSON)
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

    let currentQuizData: QuizObject = {
        title: "",
        difficulty: 0,
        description: "",
        group: "",
        id: 0,
        image: "",
        time: 0,
        questionsID: []
    };

    quizObjects.forEach(quiz => {
        if (quiz.id === currentQuiz.id) {
            currentQuizData = quiz
            currentQuizRef.current = quiz
        }
    });



    let numberFull: number = currentQuizData.difficulty;

    let timeMinutes: number = Math.floor(currentQuizData.time / 60)
    let timeSeconds: number = currentQuizData.time - timeMinutes * 60


    let quizTriesJSON: string = localStorage.getItem("quizTriesArray") || ""
    let averageScore: string = "N/A"
    let arrayPreviousScores: quizTry[] = []
    let averageScoreCurrentUser: string = "N/A"
    let atleastOneTry: boolean = false;

    if (quizTriesJSON != "") {
        let quizTries: quizTry[] = JSON.parse(quizTriesJSON)
        let sum: number = 0;
        let counter: number = 0;
        let sumCurrentUser: number = 0;
        let counterCurrentUser: number = 0;
        quizTries.forEach((attempt: quizTry) => {
            if (attempt.quizID === currentQuiz.id) {
                sum = sum + attempt.score
                counter++;
            }

            if (attempt.quizID === currentQuiz.id && attempt.userID === currentUser.id) {
                sumCurrentUser = sumCurrentUser + attempt.score
                counterCurrentUser++;
                arrayPreviousScores.push(attempt)
                atleastOneTry = true;
            }
        })

        if (counter != 0) {
            let average: number = sum / counter
            averageScore = average.toFixed(2) + "%"
        }

        if (atleastOneTry)
            averageScoreCurrentUser = ((sumCurrentUser / counterCurrentUser).toFixed(2)).toString() + "%"

    }


    function colorScore(score: number): string {
        if (score >= 83)
            return "#174d10"

        if (score >= 66 && score < 83)
            return "#2dc41a"

        if (score >= 49 && score < 66)
            return "#e36a0e"

        if (score >= 32 && score < 49)
            return "#cc8054"

        if (score >= 15 && score < 32)
            return "#bf4e4e"

        if (score < 15)
            return "#f20505"

        return "#000000"
    }




    return (
        <div>
            <Menu page={pageType.Quizzes} user={currentUser} />
            <div id="single-Quiz-page-container">
                <div id="single-Quiz-page-container-left">
                    <div id="quizTitle">{currentQuizData.title}</div>
                    <img src={"/img/" + currentQuizData.image} className='quizIMG' />
                </div>
                <div id="single-Quiz-page-container-center">
                    <div id="difficultyContainer">Difficulty:
                        <span id="starsContainer">
                            {
                                [1, 2, 3, 4, 5].map(i => {
                                    if (i <= numberFull) {
                                        return <img src={starFull} className='singleStar'></img>
                                    }
                                    else {
                                        return <img src={starEmpty} className='singleStar'></img>
                                    }
                                })
                            }
                        </span>
                    </div>
                    <div>Time duration: <span id="timeContainerMinutes">{timeMinutes != 0 ? timeMinutes + "min" : ""}</span> <span id="timeContainerSeconds">{timeSeconds != 0 ? timeSeconds + "sec" : ""}</span></div>
                    <div>Average score: <span id="averageContainer">{averageScore}</span></div>
                    <div id="quizDescription">
                        {currentQuizData.description}
                    </div>
                </div>
                <div id="single-Quiz-page-container-right">
                    <div id="myAttempts">
                        My attempts:
                        <div>
                            <div id="ulContainer">
                                <ul>
                                    {arrayPreviousScores[arrayPreviousScores.length - 6] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 6].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 6].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 6].score).toFixed(2) + "%"}</li>}
                                    {arrayPreviousScores[arrayPreviousScores.length - 5] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 5].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 5].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 5].score).toFixed(2) + "%"}</li>}
                                    {arrayPreviousScores[arrayPreviousScores.length - 4] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 4].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 4].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 4].score).toFixed(2) + "%"}</li>}
                                    {arrayPreviousScores[arrayPreviousScores.length - 3] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 3].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 3].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 3].score).toFixed(2) + "%"}</li>}
                                    {arrayPreviousScores[arrayPreviousScores.length - 2] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 2].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 2].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 2].score).toFixed(2) + "%"}</li>}
                                    {arrayPreviousScores[arrayPreviousScores.length - 1] && <li style={{ color: colorScore(arrayPreviousScores[arrayPreviousScores.length - 1].score) }}>{arrayPreviousScores[arrayPreviousScores.length - 1].date + " " + (arrayPreviousScores[arrayPreviousScores.length - 1].score).toFixed(2) + "%"}</li>}
                                </ul>
                            </div>

                            <div>My average score: {averageScoreCurrentUser}</div>
                        </div>
                    </div>
                    <div id="btnStartQuiz" onClick={() => {
                        navigate('/single-question')
                    }}>START QUIZZ</div>
                </div>
            </div>
        </div>
    )
}