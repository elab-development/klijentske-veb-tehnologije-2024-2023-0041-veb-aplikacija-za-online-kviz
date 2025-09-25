import { Menu } from "./Menu";
import '../css/home.css'
import { pageType } from '../components/Menu'
import { dataUser } from '../modules/User';
import arrowUpRight from '../img/arrow-up-right.png'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Home() {
    const navigate = useNavigate();
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;


    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else {
        return <div></div>

    }


    return (
        <div>
            <Menu page={pageType.Home} user={currentUser}></Menu>
            <div id="content-Home">
                <div id="title-home">QUIZIX</div>
                <div id="subtitle-home">Test your knowledge in a fun way!</div>
                <div id="button-home" onClick={() => navigate('/quizzes')}>Try our quizzes <img src={arrowUpRight} id='img-home-button' ></img></div>
            </div>
        </div>



    );
}