import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import "../css/singleQuiz.css"
import history from '../img/history.jpg'
import geography from '../img/geography.jpg'
import football from '../img/football.jpg'
import tennis from '../img/tennis.jpeg'
import basketball from '../img/basketball.png'
import economics from '../img/economics.jpg'
import defaultQuizIMG from '../img/default.jpg'
import starFull from '../img/star-full.png'
import starEmpty from '../img/star-empty.png'
import { QuizObject } from './QuizCard'
import { useNavigate } from "react-router-dom";

export function SingleQuiz() {
    let navigate = useNavigate()
    let currentQuizID: number;

    let currentQuizIDJSON: any = localStorage.getItem("currentQuiz")
    if (currentQuizIDJSON != null) {
        currentQuizID = JSON.parse(currentQuizIDJSON)
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
        time: 0
    };

    quizObjects.forEach(quiz => {
        if (quiz.id === currentQuizID) {
            currentQuizData = quiz
        }
    });
    let img;
    switch (currentQuizData.image) {
        case "history.jpg": img = <img src={history} className='quizIMG' />; break;
        case "geography.jpg": img = <img src={geography} className='quizIMG' />; break;
        case "football.jpg": img = <img src={football} className='quizIMG' />; break;
        case "tennis.jpg": img = <img src={tennis} className='quizIMG' />; break;
        case "basketball.jpg": img = <img src={basketball} className='quizIMG' />; break;
        case "economics.jpg": img = <img src={economics} className='quizIMG' />; break;
        default: img = <img src={defaultQuizIMG} className='quizIMG' />; break;
    }

    let numberFull: number = currentQuizData.difficulty;

    let timeMinutes: number = Math.floor(currentQuizData.time / 60)
    let timeSeconds: number = currentQuizData.time - timeMinutes * 60

    return (
        <div>
            <Menu page={pageType.Quizzes} user={currentUser} />
            <div id="single-Quiz-page-container">
                <div id="single-Quiz-page-container-left">
                    <div id="quizTitle">{currentQuizData.title}</div>
                    {img}
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
                    <div>Average score: <span id="averageContainer">45%</span></div>
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
                                    <li id="li1">20.7.2025 50%</li>
                                    <li id="li2">21.7.2025 70%</li>
                                    <li id="li3">23.7.2025 80%</li>
                                    <li id="li4">24.7.2025 70%</li>
                                    <li id="li5">23.7.2025 80%</li>
                                    <li id="li6">24.7.2025 70%</li>
                                </ul>
                            </div>

                            <div>Average score: {"67,5%"}</div>
                        </div>
                    </div>
                    <div id="btnStartQuiz" onClick={() => { navigate('/single-question') }}>START QUIZZ</div>
                </div>
            </div>
        </div>
    )
}