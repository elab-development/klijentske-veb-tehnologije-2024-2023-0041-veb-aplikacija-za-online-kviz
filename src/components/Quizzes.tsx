import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import { ComboBox } from "./ComboBox";
import '../css/quizzes.css'

import { QuizCard } from "./QuizCard";

export function Quizzes() {

    let list1: string[] = ["Football", "Tennis", "Basketball"]
    let list2: string[] = ["1 star", "2 star", "3 star"]
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

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
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                </div>
            </div>

        </div>
    )
}