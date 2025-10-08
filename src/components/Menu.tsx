import '../css/menu.css'
import logo from '../img/logo1.png'
import userPhoto from '../img/userPhoto.png'
import logout from '../img/logout-line-svgrepo-com.png'
import { dataUser } from '../modules/User';
import { useNavigate } from 'react-router-dom';
import { couldStartTrivia } from 'typescript';


export enum pageType {
    Home = "Home",
    Quizzes = "Quizzes",
    MyStats = "MyStats",
    MyProfile = "MyProfile",
    Stat = "Stats",
    Edit = "Edit",
}
interface menuObject {
    page: pageType;
    user: dataUser;
}


export function Menu(props: menuObject) {
    const navigate = useNavigate()

    function logoutMethod() {
        localStorage.removeItem("currentUser")
        navigate('/log-in')
    }

    function menuNavigation(event: React.MouseEvent<HTMLDivElement>) {
        const target = event.target as HTMLDivElement

        switch (target.innerHTML) {
            case "HOME": navigate('/home'); break;
            case "QUIZZES": navigate('/quizzes'); break;
            case "MY STATS": navigate('/my-stats'); break;
            case "MY PROFILE": navigate('/my-profile'); break;
            case "STATS": navigate('/my-stats'); break;
            case "EDIT": navigate('/my-profile'); break;
        }
    }
    return (
        <div className="menu">
            <div className='logoDiv'>
                <img src={logo} className='logoDivIMG'></img>
                <div className='logoDivTXT'>QUIZIX</div>
            </div>
            <div className='single-menu-container'>
                <div className={props.page === pageType.Home ? 'onPageState' : 'single-menu-field'} onClick={menuNavigation}>HOME</div>
                <div className={props.page === pageType.Quizzes ? 'onPageState' : 'single-menu-field'} onClick={menuNavigation}>QUIZZES</div>
                <div className={props.page === pageType.MyStats ? 'onPageState' : 'single-menu-field'} onClick={menuNavigation}>{props.user.username === "admin" ? "STATS" : "MY STATS"}</div>
                <div className={props.page === pageType.MyProfile ? 'onPageState' : 'single-menu-field'} onClick={menuNavigation}>{props.user.username === "admin" ? "EDIT" : "MY PROFILE"}</div >
            </div >

            <div className='userInfoContainer'>
                <img src={userPhoto} className='userPhoto'></img>
                <div className='userName'>{props.user.username}</div>
                <img src={logout} className='userLogout' onClick={logoutMethod}></img>
            </div>
        </div >
    );
}