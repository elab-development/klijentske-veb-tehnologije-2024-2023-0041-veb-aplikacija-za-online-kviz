import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import '../css/singleQuestion.css'
import { AnswerOption } from "./AnswerOption";
import arrowLeft from "../img/arrow-left.png"
import arrowRight from "../img/arrow-right.png"


export function SingleQuestion() {

    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

    return (
        <div>
            <Menu user={currentUser} page={pageType.Quizzes} />
            <div id="single-question-content">
                <div id="topPart"><div>TOPIC OF QUIZ: GEOGRAPHY</div> <div>Time left: 9:23</div></div>
                <div id="questionANDanswersContainer">
                    <div id="questionContainer">1. What is the name of capital of Slovenia?</div>
                    <div id="answerOptionsContainer">
                        <div className="answerOptionRow">
                            <AnswerOption />
                            <AnswerOption />
                        </div>

                        <div className="answerOptionRow">
                            <AnswerOption />
                            <AnswerOption />
                        </div>
                    </div>

                </div>
            </div>
            <div id="nextQuestion">
                <div className="currentQuestionNumber">2/10</div>
                <img className="nextArrow" src={arrowRight}></img>
                <div className="currentQuestionText">NEXT</div>
            </div>

            <div id="previousQuestion">
                <div className="currentQuestionNumber">2/10</div>
                <img className="nextArrow" src={arrowLeft}></img>
                <div className="currentQuestionText">PAST</div>
            </div>


        </div>
    );
}