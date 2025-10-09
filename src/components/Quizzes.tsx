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
import arrowLeft from "../img/arrow-left.png"
import arrowRight from "../img/arrow-right.png"
import { Quiz } from "../modules/Quiz";



export function Quizzes() {
    let navigate = useNavigate()
    const [quizCardData, setQuizCardData] = useState<QuizObject[]>([])
    const [comboBoxGroup, setComboBoxGroup] = useState<string>("Group")
    const [comboBoxDifficulty, setComboBoxDifficulty] = useState<string>("Difficulty")
    const [paginationSize, setPaginationSize] = useState<number>(1)
    const [paginationState, setPaginationState] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [registerChangePage, setRegisterChangePage] = useState<boolean>(true)


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
        let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let allQuizzes: QuizObject[] = quiz.getAllQuizzes()
        let selectedQuizzes: QuizObject[] = []

        if (!paginationState) {
            setQuizCardData(allQuizzes)
        }
        if (paginationState) {


            let numberOfPages: number = 1
            if (allQuizzes.length % paginationSize === 0) {
                numberOfPages = allQuizzes.length / paginationSize
            }
            else {
                numberOfPages = Math.floor(allQuizzes.length / paginationSize) + 1
            }

            allQuizzes.forEach((quiz: QuizObject, index: number) => {
                if (page != 1 && page != numberOfPages) {
                    if ((index + 1) > paginationSize * (page - 1) && (index + 1) <= paginationSize * page) {
                        selectedQuizzes.push(quiz)
                        setRegisterChangePage(!registerChangePage)
                    }
                }

                if (page === 1) {
                    if ((index + 1) <= paginationSize) {
                        selectedQuizzes.push(quiz)
                        setRegisterChangePage(!registerChangePage)
                    }
                }

                if (page === numberOfPages) {
                    if (!(allQuizzes.length % paginationSize === 0)) {
                        if ((index + 1) > (allQuizzes.length - (allQuizzes.length % paginationSize)))
                            selectedQuizzes.push(quiz)
                    }
                    else {
                        if ((index + 1) > (allQuizzes.length - paginationSize)) {
                            selectedQuizzes.push(quiz)
                        }
                    }

                }



            })

            setQuizCardData(selectedQuizzes)
        }
    }, [paginationState, registerChangePage])



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

    function nextPage(option: string) {
        let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let allQuizzes: QuizObject[] = quiz.getAllQuizzes()

        if (allQuizzes.length % paginationSize === 0) {
            numberOfPages = allQuizzes.length / paginationSize
        }
        else {
            numberOfPages = Math.floor(allQuizzes.length / paginationSize) + 1
        }


        if (option === "previous" && page > 1) {
            setPage(page - 1)
            setRegisterChangePage(!registerChangePage)
        }

        if (option === "next" && page < numberOfPages) {
            setPage(page + 1)
            setRegisterChangePage(!registerChangePage)

        }

    }



    function filterQuiz() {
        if (paginationState) {
            alert("Turn off pagination to use filter!")
            return
        }
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

    let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
    let allQuizzes: QuizObject[] = quiz.getAllQuizzes()
    let numberOfPages: number = 1
    if (allQuizzes.length % paginationSize === 0) {
        numberOfPages = allQuizzes.length / paginationSize
    }
    else {
        numberOfPages = Math.floor(allQuizzes.length / paginationSize) + 1
    }

    return (
        <div id="quizzesPage">
            <Menu page={pageType.Quizzes} user={currentUser} />
            <div id="quizzes-content-container">
                <div id="filter-container">
                    <div id="filter-text">Filter:</div>
                    <ComboBox name='Group' listOptions={list1} state={setComboBoxGroup} />
                    <ComboBox name='Difficulty' listOptions={list2} state={setComboBoxDifficulty} />
                    <button id="search-filter-btn" onClick={filterQuiz}>SEARCH</button>
                    <div id="paginationConteiner">
                        {"Pagination: "}
                        <input type="checkbox" id="checkPagination" onClick={() => setPaginationState(!paginationState)} />
                        {"Number of quizzes per page: "}
                        <input type="number" value={paginationSize} min={1} max={allQuizzes.length} id="paginationInput" onChange={e => { setPaginationSize(parseInt(e.target.value)); setRegisterChangePage(!registerChangePage) }} />
                        <img src={arrowLeft} className="arrow" onClick={() => nextPage("previous")}></img>
                        {page + "/" + numberOfPages}
                        <img src={arrowRight} className="arrow" onClick={() => nextPage("next")}></img>
                    </div>
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