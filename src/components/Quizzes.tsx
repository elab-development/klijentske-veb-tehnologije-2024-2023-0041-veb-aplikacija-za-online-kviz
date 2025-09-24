import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import { ComboBox } from "./ComboBox";
import { QuizCard } from "./QuizCard"
import '../css/quizzes.css'
import { QuizObject } from './QuizCard'


export function Quizzes() {

    let list1: string[] = [];
    let list2: string[] = ["0 star", "1 star", "2 star", "3 star", "4 star", "5 star"]
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

    let quizData = localStorage.getItem("quizObjects")

    if (quizData === null) {
        return (
            <div>
                <Menu page={pageType.Quizzes} user={currentUser} />
                <div id="noQuiz">
                    There are no availabile quizzes!
                </div>
            </div>
        )
    }

    let structuredQuizData: QuizObject[] = JSON.parse(quizData);

    structuredQuizData.forEach(quiz => {
        if (!list1.includes(quiz.group))
            list1.push(quiz.group)
    })



    return (
        <div>
            <Menu page={pageType.Quizzes} user={currentUser} />
            <div id="quizzes-content-container">
                <div id="filter-container">
                    <div id="filter-text">Filter:</div>
                    <ComboBox name='Group' listOptions={list1} />
                    <ComboBox name='Difficulty' listOptions={list2} />
                    <button id="search-filter-btn">SEARCH</button>
                </div>
                <div id="list-of-quiz">
                    {
                        structuredQuizData.map(quiz => {
                            return <QuizCard object={quiz} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}