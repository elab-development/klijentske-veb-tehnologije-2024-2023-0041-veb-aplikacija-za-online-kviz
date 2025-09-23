import '../css/quizCard.css'
import napoleon from '../img/napoleon.jpg'
import starFull from '../img/star-full.png'
import starEmpty from '../img/star-empty.png'
import { useNavigate } from 'react-router-dom'

export function QuizCard() {
    let navigate = useNavigate();
    let numberFull: number = 3;

    return (
        <div className="single-quiz-card">
            <div className='quiz-img'><img src={napoleon} className='quizSourceIMG' /></div>
            <div className='quiz-info'>
                <div className='quiz-title' onClick={() => { navigate('/single-quiz') }}>HISTORY</div>
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
                <div className='quiz-description'>This quiz is about  historical figures, wars, battles, myths, legends</div>
            </div>
        </div>
    );
}