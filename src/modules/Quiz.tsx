import { difficulty } from "../components/QuizCard"
import { QuizObject } from "../components/QuizCard"
import { quizQuestion, quizTry } from "../components/SingleQuestion"

interface quizMethods {
    getAllQuizzes(): QuizObject[]
    getQuizQuestionsCurrent(questionIDs: number[]): quizQuestion[]
    getQuizNames(): string[]
    getQuizByName(name: string): QuizObject
    getAllQuizQuestions(): quizQuestion[]
    getNextQuestionID(): number
    getNextQuizID(): number
    getAllQuizTries(): quizTry[]
}

export class Quiz implements QuizObject, quizMethods {
    title: string
    description: string
    difficulty: difficulty
    group: string
    id: number
    image: string
    questionsID: number[]
    time: number

    constructor(title: string, description: string, difficulty: difficulty, group: string, id: number, image: string, questionsID: number[], time: number) {
        this.title = title
        this.description = description
        this.difficulty = difficulty
        this.group = group
        this.id = id
        this.image = image
        this.questionsID = questionsID
        this.time = time
    }


    getAllQuizzes(): QuizObject[] {
        let quizDataJSON: string = localStorage.getItem("quizObjects") || ""
        if (quizDataJSON != "") {
            let quizData: QuizObject[] = JSON.parse(quizDataJSON)
            return quizData
        }
        else
            return []

    }

    getQuizQuestionsCurrent(questionIDs: number[]): quizQuestion[] {
        let allQuestionsJSON: string = localStorage.getItem("arrayQuestions") || ""
        let resultArray: quizQuestion[] = []
        if (allQuestionsJSON != "") {
            let allQuestions: quizQuestion[] = JSON.parse(allQuestionsJSON)
            allQuestions.forEach((question: quizQuestion) => {
                if (questionIDs.includes(question.questionID)) {
                    resultArray.push(question)
                }
            })
        }


        return resultArray
    }


    getQuizNames(): string[] {
        let quizData: QuizObject[] = this.getAllQuizzes()
        let resultArray: string[] = []
        quizData.forEach((quiz: QuizObject) => {
            resultArray.push(quiz.title)
        })
        return resultArray
    }

    getQuizByName(name: string): QuizObject {
        let quizData: QuizObject[] = this.getAllQuizzes()
        let result: QuizObject = {
            title: "asdas",
            description: "",
            difficulty: 0,
            group: "",
            id: -5,
            image: "",
            questionsID: [],
            time: 0
        };
        quizData.forEach((quiz: QuizObject) => {
            if (name === quiz.title)
                result = quiz
        })
        return result
    }

    getAllQuizQuestions(): quizQuestion[] {
        let allQuestionsJSON: string = localStorage.getItem("arrayQuestions") || ""
        if (allQuestionsJSON != "") {
            let allQuestions: quizQuestion[] = JSON.parse(allQuestionsJSON)
            return allQuestions
        }
        else
            return []
    }

    getNextQuestionID(): number {
        let result: number = -1
        let allQuestions: quizQuestion[] = this.getAllQuizQuestions()
        let idArray: number[] = []
        let indexFound: boolean = false
        let index: number = 1;
        allQuestions.forEach((question: quizQuestion) => {
            idArray.push(question.questionID)
        })

        while (!indexFound) {
            if (!idArray.includes(index)) {
                result = index;
                indexFound = true;
            }
            index++;
        }

        return result
    }

    getNextQuizID(): number {
        let result: number = -1
        let allQuizzes: QuizObject[] = this.getAllQuizzes()
        let idArray: number[] = []
        let indexFound: boolean = false
        let index: number = 1;
        allQuizzes.forEach((quiz: QuizObject) => {
            idArray.push(quiz.id)
        })

        while (!indexFound) {
            if (!idArray.includes(index)) {
                result = index;
                indexFound = true;
            }
            index++;
        }

        return result
    }

    getAllQuizTries(): quizTry[] {
        let allQuizTriesJSON: string = localStorage.getItem("quizTriesArray") || ""
        if (allQuizTriesJSON != "") {
            let allQuizTries: quizTry[] = JSON.parse(allQuizTriesJSON)
            return allQuizTries
        }
        else
            return []
    }

}