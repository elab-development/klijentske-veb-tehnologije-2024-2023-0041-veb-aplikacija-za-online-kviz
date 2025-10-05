import { QuizObject } from "../components/QuizCard";
import { difficulty } from "../components/QuizCard";
import { quizTry } from "../components/SingleQuestion";

export function updateDifficulty(quizData: QuizObject[]): QuizObject[] {

    let quizTriesArrayJSON: string = localStorage.getItem("quizTriesArray") || ""

    if (quizTriesArrayJSON != "") {
        let quizTriesArray: quizTry[] = JSON.parse(quizTriesArrayJSON);

        quizData.forEach((quiz: QuizObject) => {
            let sum: number = 0;
            let counter: number = 0;
            let change = false;
            quizTriesArray.forEach((attempt: quizTry) => {
                if (quiz.id === attempt.quizID) {
                    sum = sum + attempt.score
                    counter++;
                    change = true;
                }
            })

            if (change) {
                let difficulty: difficulty = 0
                let averageDifficulty: number = sum / counter;

                if (averageDifficulty >= 83)
                    difficulty = 0

                if (averageDifficulty >= 66 && averageDifficulty < 83)
                    difficulty = 1

                if (averageDifficulty >= 49 && averageDifficulty < 66)
                    difficulty = 2

                if (averageDifficulty >= 32 && averageDifficulty < 49)
                    difficulty = 3

                if (averageDifficulty >= 15 && averageDifficulty < 32)
                    difficulty = 4

                if (averageDifficulty < 15)
                    difficulty = 5

                quiz.difficulty = difficulty
            }
        })
    }

    localStorage.setItem("quizObjects", JSON.stringify(quizData))
    return quizData
}