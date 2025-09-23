import '../css/login.css';
import logo from '../img/logo.png'
import { InputText } from './InputText';
import rightArrow from '../img/arrow-right.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputType } from './InputText';
import { User } from '../modules/User'


export function LogIn() {
    const navigate = useNavigate();
    const [loginObject, setLoginObject] = useState<string[]>([]);


    function loginUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (loginObject[0] && loginObject[1]) {
            let helpUser: User = new User("", "", "",);
            let id = helpUser.checkCredentials(loginObject[0], loginObject[1])

            if (id === 0) {
                alert("U entered wrong username or password!")
                return
            }

            alert("You logged-in succesfully!")


        }
        else
            alert("Please fill all the fields!")
    }

    return (
        <div id='logInPage'>
            <img id='logoLogIn' src={logo} />
            <form id='inputContainerLogin'>
                <div id='inputContainerTopLogin'>LOG-IN</div>
                <div id='inputContainerMiddleLogin'>
                    <InputText handle={setLoginObject} type={InputType.Username} login={true} loginObject={loginObject} name="username" />
                    <InputText handle={setLoginObject} type={InputType.Password} login={true} loginObject={loginObject} name="password" />
                </div>
                <div id='inputContainerBottomLogin'>
                    <button id='submitButtonLogin' onClick={loginUser}>
                        <img src={rightArrow} id='rightArrowLogin' />
                    </button>


                    <div id='TextFormLogin'>If you already have an account <span id='clickTextFormLogin' onClick={() => { navigate('/') }}>sign-in</span> </div>
                </div>
            </form>
        </div>
    );
}