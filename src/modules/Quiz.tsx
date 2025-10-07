import { difficulty } from "../components/QuizCard"
import { QuizObject } from "../components/QuizCard"
import { quizQuestion } from "../components/SingleQuestion"

interface quizMethods {
    getAllQuizzes(): QuizObject[]
    getQuizQuestionsCurrent(questionIDs: number[]): quizQuestion[]
    getQuizNames(): string[]
    getQuizByName(name: string): QuizObject
    getAllQuizQuestions(): quizQuestion[]
    getNextQuestionID(): number
    getNextQuizID(): number
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
            console.log(quiz.title)
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
        return this.getAllQuizQuestions().length + 1
    }

    getNextQuizID(): number {
        return this.getAllQuizzes().length + 1
    }

}