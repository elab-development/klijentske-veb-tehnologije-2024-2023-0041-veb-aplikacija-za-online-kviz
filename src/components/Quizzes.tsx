import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import { ComboBox } from "./ComboBox";
import { QuizCard } from "./QuizCard"
import '../css/quizzes.css'
import { QuizObject } from './QuizCard'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizTry } from "./SingleQuestion";
import { difficulty } from "./QuizCard";
import { updateDifficulty } from "../modules/updateDifficulty";


export function Quizzes() {
    let navigate = useNavigate()
    const [quizCardData, setQuizCardData] = useState<QuizObject[]>([])
    const [comboBoxGroup, setComboBoxGroup] = useState<string>("Group")
    const [comboBoxDifficulty, setComboBoxDifficulty] = useState<string>("Difficulty")


    let list1: string[] = [];
    let list2: string[] = ["0 star", "1 star", "2 star", "3 star", "4 star", "5 star"]
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;
    let quizData = localStorage.getItem("quizObjects")


    if (quizData != null) {
        let data: QuizObject[] = JSON.parse(quizData);
        data.forEach(quiz => {
            if (!list1.includes(quiz.group))
                list1.push(quiz.group)
        })
    }


    useEffect(() => {


        if (quizData != null) {
            let structuredQuizData: QuizObject[] = JSON.parse(quizData);

            let updatedDifficultyData: QuizObject[] = updateDifficulty(structuredQuizData)
            setQuizCardData(updatedDifficultyData)
        }

    }, [])


    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else {
        navigate("/log-in")
        return <div></div>
    }



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



    function filterQuiz() {
        if (comboBoxGroup === "Group" && comboBoxDifficulty === "Difficulty") {
            if (quizData != null) {
                let data: QuizObject[] = JSON.parse(quizData);
                let dataUpdated: QuizObject[] = updateDifficulty(data)
                setQuizCardData(dataUpdated)
                return
            }
            else
                return
        }


        if (quizData != null) {
            let data: QuizObject[] = JSON.parse(quizData);
            let filteredData: QuizObject[] = [];
            let difficulty: number = -1;

            switch (comboBoxDifficulty) {
                case "0 star": difficulty = 0; break;
                case "1 star": difficulty = 1; break;
                case "2 star": difficulty = 2; break;
                case "3 star": difficulty = 3; break;
                case "4 star": difficulty = 4; break;
                case "5 star": difficulty = 5; break;
            }

            let dataUpdated: QuizObject[] = updateDifficulty(data)
            dataUpdated.forEach(quiz => {

                if (comboBoxGroup === "Group" && difficulty === quiz.difficulty) {
                    filteredData.push(quiz)
                }

                if (comboBoxDifficulty === "Difficulty" && comboBoxGroup === quiz.group) {
                    filteredData.push(quiz)
                }

                if (comboBoxGroup === quiz.group && difficulty === quiz.difficulty) {
                    filteredData.push(quiz)
                }
            })



            setQuizCardData(filteredData)
        }
        else
            return
    }

    return (
        <div>
            <Menu page={pageType.Quizzes} user={currentUser} />
            <div id="quizzes-content-container">
                <div id="filter-container">
                    <div id="filter-text">Filter:</div>
                    <ComboBox name='Group' listOptions={list1} state={setComboBoxGroup} />
                    <ComboBox name='Difficulty' listOptions={list2} state={setComboBoxDifficulty} />
                    <button id="search-filter-btn" onClick={filterQuiz}>SEARCH</button>
                </div>
                <div id="list-of-quiz">
                    {
                        quizCardData.map(quiz => {
                            return <QuizCard object={quiz} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}