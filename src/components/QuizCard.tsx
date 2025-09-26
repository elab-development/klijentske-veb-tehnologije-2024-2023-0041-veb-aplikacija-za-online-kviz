import '../css/quizCard.css'
import history from '../img/history.jpg'
import geography from '../img/geography.jpg'
import football from '../img/football.jpg'
import tennis from '../img/tennis.jpeg'
import basketball from '../img/basketball.png'
import economics from '../img/economics.jpg'
import defaultQuizIMG from '../img/default.jpg'
import starFull from '../img/star-full.png'
import starEmpty from '../img/star-empty.png'
import { useNavigate } from 'react-router-dom'
import { number } from 'yup'


type difficulty = 0 | 1 | 2 | 3 | 4 | 5

export interface QuizObject {
    title: string
    difficulty: difficulty
    description: string
    group: string
    id: number
    image: string
    time: number
}

interface QuziProps {
    object: QuizObject
}


export function QuizCard(props: QuziProps) {
    let navigate = useNavigate();
    let numberFull: number = props.object.difficulty;
    let img;

    switch (props.object.image) {
        case "history.jpg": img = <img src={history} className='quizSourceIMG' />; break;
        case "geography.jpg": img = <img src={geography} className='quizSourceIMG' />; break;
        case "football.jpg": img = <img src={football} className='quizSourceIMG' />; break;
        case "tennis.jpg": img = <img src={tennis} className='quizSourceIMG' />; break;
        case "basketball.jpg": img = <img src={basketball} className='quizSourceIMG' />; break;
        case "economics.jpg": img = <img src={economics} className='quizSourceIMG' />; break;
        default: img = <img src={defaultQuizIMG} className='quizSourceIMG' />; break;
    }

    function enterSingleQuiz(idQuiz: number) {
        localStorage.setItem("currentQuiz", JSON.stringify(idQuiz))
        navigate('/single-quiz')
    }

    return (
        <div className="single-quiz-card">
            <div className='quiz-img'>
                {img}
            </div>
            <div className='quiz-info'>
                <div className='quiz-title' onClick={() => enterSingleQuiz(props.object.id)}>{props.object.title}</div>
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