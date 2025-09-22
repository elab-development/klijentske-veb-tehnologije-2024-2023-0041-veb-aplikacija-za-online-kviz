import '../css/signin.css';
import logo from '../img/logo.png'
import { InputText } from './InputText';
import { InputType } from './InputText';
import rightArrow from '../img/arrow-right.png'

export function SignIn() {
    return (
        <div id='signInPage'>
            <img id='logoSigIn' src={logo} />
            <div className='inputContainer'>
                <div className='inputContainerTop'>SIGN-IN</div>
                <div className='inputContainerMiddle'>
                    <InputText type={InputType.Username} />
                    <InputText type={InputType.Email} />
                    <InputText type={InputType.Password} />
                    <InputText type={InputType.RepeatPassword} />
                </div>
                <div className='inputContainerBottom'>
                    <img src={rightArrow} className='rightArrow' />
                    <div className='TextForm'>If you already have an account <span className='clickTextForm'>log-in</span> </div>
                </div>
            </div>
        </div>
    );
}