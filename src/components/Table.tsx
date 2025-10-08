import { useNavigate } from 'react-router-dom'
import '../css/table.css'
import { quizTry } from './SingleQuestion'
import { dataUser } from '../modules/User';
import { QuizObject } from './QuizCard';
import { stringifyTime } from '../modules/stringifyTime';
import { Quiz } from '../modules/Quiz';



interface tableData {
    quizName: string,
    numberOfAttemtps: number,
    averageScore: string,
    averageTime: string,
    bestScore: string,
    bestTime: string,
}

interface tableProps {
    admin: boolean;
}

export function Table(props: tableProps) {
    const navigate = useNavigate();

    if (props.admin) {
        let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let allQuizData: QuizObject[] = quiz.getAllQuizzes()
        let allTriesData: quizTry[] = quiz.getAllQuizTries()
        let finalData: tableData[] = []
        allQuizData.forEach((quiz: QuizObject) => {
            let counter: number = 0
            let sumScore: number = 0
            let sumTime: number = 0
            let bestScore: number = -100
            let bestTime: number = 10000000
            let found: boolean = false
            allTriesData.forEach((singleTry: quizTry) => {
                if (quiz.id === singleTry.quizID) {
                    found = true
                    counter++
                    sumScore = sumScore + singleTry.score
                    sumTime = sumTime + singleTry.time
                    if (bestScore < singleTry.score)
                        bestScore = singleTry.score

                    if (bestTime > singleTry.time)
                        bestTime = singleTry.time
                }
            })

            if (found) {
                let stringifiedTime: string[] = stringifyTime(Math.floor(sumTime / counter))
                let singleRow: tableData = {
                    quizName: quiz.title,
                    numberOfAttemtps: counter,
                    averageScore: (sumScore / counter).toFixed(2),
                    averageTime: stringifiedTime[0] + ":" + stringifiedTime[1],
                    bestScore: bestScore.toString(),
                    bestTime: bestTime.toString(),
                }

                finalData.push(singleRow)
            }


        })


        return (<table>
            <tr>
                <th></th>
                <th>Number of attempts</th>
                <th>Average score</th>
                <th>Average time</th>
                <th>Best score</th>
                <th>Best time</th>
            </tr>

            {
                finalData.map((singleRow: tableData) => {
                    return (
                        <tr>
                            <th>{singleRow.quizName}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.numberOfAttemtps}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.averageScore + "%"}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.averageTime}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.bestScore + "%"}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.bestTime}</th>
                        </tr>
                    );
                })
            }
        </table>)
    }






















    let allAttemptsJSON: string = localStorage.getItem("quizTriesArray") || ""

    if (allAttemptsJSON === "") {
        return (
            <table>
                <tr>
                    <th></th>
                    <th>Number of attempts</th>
                    <th>Average score</th>
                    <th>Average time</th>
                    <th>Best score</th>
                    <th>Best time</th>
                </tr>
            </table>
        )
    }
    let allAttempts = JSON.parse(allAttemptsJSON)


    let currentUserJSON: string = localStorage.getItem("currentUser") || ""

    if (currentUserJSON === "") {
        navigate('/log-in')
        return <div></div>
    }

    let currentUser: dataUser = JSON.parse(currentUserJSON)
    let userAttempts: quizTry[] = []
    let userQuizIDAttemptedArray: number[] = []

    allAttempts.forEach((attempt: quizTry) => {
        if (attempt.userID === currentUser.id) {
            userAttempts.push(attempt)
            if (!userQuizIDAttemptedArray.includes(attempt.quizID))
                userQuizIDAttemptedArray.push(attempt.quizID)
        }
    })

    if (userAttempts.length === 0) {
        return (
            <table>
                <tr>
                    <th></th>
                    <th>Number of attempts</th>
                    <th>Average score</th>
                    <th>Average time</th>
                    <th>Best score</th>
                    <th>Best time</th>
                </tr>
            </table>
        )
    }

    let quizesDataJSON: string = localStorage.getItem("quizObjects") || ""

    if (quizesDataJSON === "") {
        return (
            <table>
                <tr>
                    <th></th>
                    <th>Number of attempts</th>
                    <th>Average score</th>
                    <th>Average time</th>
                    <th>Best score</th>
                    <th>Best time</th>
                </tr>
            </table>
        )
    }
    let quizesData: QuizObject[] = JSON.parse(quizesDataJSON)
    let tableData: tableData[] = []

    userQuizIDAttemptedArray.forEach((id: number) => {
        quizesData.forEach((quiz: QuizObject) => {
            if (id === quiz.id) {
                let counter: number = 0;
                let sumScore: number = 0;
                let sumTime: number = 0;
                let maxScore: number = 0;
                let bestTime: number = 100000000000;
                userAttempts.forEach((attempt: quizTry) => {
                    if (attempt.quizID === id) {
                        console.log("123")
                        counter++;
                        sumScore = sumScore + attempt.score
                        sumTime = sumTime + attempt.time
                        if (maxScore < attempt.score)
                            maxScore = attempt.score

                        if (bestTime > attempt.time)
                            bestTime = attempt.time
                    }
                })

                let averageScore: number = sumScore / counter
                let averageTime: number = Math.floor(sumTime / counter)

                let stringifyTimeBestTime: string[] = stringifyTime(bestTime)
                let stringifyTimeAverageTime: string[] = stringifyTime(averageTime)

                let singleTableData: tableData = {
                    quizName: quiz.title,
                    numberOfAttemtps: counter,
                    averageScore: averageScore.toFixed(2),
                    averageTime: stringifyTimeAverageTime[0] + ":" + stringifyTimeAverageTime[1],
                    bestScore: maxScore.toFixed(2),
                    bestTime: stringifyTimeBestTime[0] + ":" + stringifyTimeBestTime[1],
                }

                tableData.push(singleTableData)
            }
        });
    })



    return (
        <table>
            <tr>
                <th></th>
                <th>Number of attempts</th>
                <th>Average score</th>
                <th>Average time</th>
                <th>Best score</th>
                <th>Best time</th>
            </tr>

            {
                tableData.map((singleRow: tableData) => {
                    return (
                        <tr>
                            <th>{singleRow.quizName}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.numberOfAttemtps}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.averageScore + "%"}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.averageTime}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.bestScore + "%"}</th>
                            <th style={{ backgroundColor: "white", color: "black" }}>{singleRow.bestTime}</th>
                        </tr>
                    );
                })
            }
        </table>
    )
}