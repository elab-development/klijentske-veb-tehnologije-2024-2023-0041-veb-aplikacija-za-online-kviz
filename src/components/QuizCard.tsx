import '../css/quizCard.css'

import starFull from '../img/star-full.png'
import starEmpty from '../img/star-empty.png'
import { useNavigate } from 'react-router-dom'
import { quizTry } from './SingleQuestion'


export type difficulty = 0 | 1 | 2 | 3 | 4 | 5

export interface QuizObject {
    title: string
    difficulty: difficulty
    description: string
    group: string
    id: number
    image: string
    time: number
    questionsID: number[]
}

interface QuziProps {
    object: QuizObject
}


export function QuizCard(props: QuziProps) {
    let navigate = useNavigate();
    let numberFull: number = props.object.difficulty;
    let img;



    function enterSingleQuiz(quiz: QuizObject) {
        localStorage.setItem("currentQuiz", JSON.stringify(quiz))
        navigate('/single-quiz')
    }

    return (
        <div className="single-quiz-card">
            <img className='quiz-img' src={"/img/" + props.object.image} />
            <div className='quiz-info'>
                <div className='quiz-title' onClick={() => enterSingleQuiz(props.object)}>{props.object.title}</div>
                <div className='quiz-difficulty'>
                    {
                        [1, 2, 3, 4, 5].map(i => {
                            if (i <= numberFull) {
                                return <img src={starFull} className='star'></img>
                            }
                            else {
                                return <img src={starEmpty} className='star'></img>
                            }
                        })
                    }
                </div>
                <div className='quiz-description'>{props.object.description}</div>
            </div>
        </div>
    );
}