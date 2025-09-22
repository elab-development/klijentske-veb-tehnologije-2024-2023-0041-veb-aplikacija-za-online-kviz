import '../css/signin.css';
import logo from '../img/logo.png'
import { InputText } from './InputText';
import { InputType } from './InputText';
import rightArrow from '../img/arrow-right.png'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


export function SignIn() {
    const schema = yup.object().shape({
        username: yup.string().required("Username is required").min(3).max(10),
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup.string().min(5).max(15).required("Password is required"),
        repeatPassword: yup.string().oneOf([yup.ref("password")], "Passwords must be the same").required("Repeating the password is required")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });




    function onSubmit(data: object) {


    }

    return (
        <div id='signInPage'>
            <img id='logoSigIn' src={logo} />
            <form className='inputContainer' onSubmit={handleSubmit(onSubmit)} >
                <div className='inputContainerTop'>SIGN-IN</div>
                <div className='inputContainerMiddle'>
                    <InputText type={InputType.Username} register={register} name="username" error={errors.username?.message} />
                    <InputText type={InputType.Email} register={register} name="email" error={errors.email?.message} />
                    <InputText type={InputType.Password} register={register} name="password" error={errors.password?.message} />
                    <InputText type={InputType.RepeatPassword} register={register} name="repeatPassword" error={errors.repeatPassword?.message} />
                </div>
                <div className='inputContainerBottom'>
                    <button type='submit' className='submitButton'>
                        <img src={rightArrow} className='rightArrow' />
                    </button>


                    <div className='TextForm'>If you already have an account <span className='clickTextForm'>log-in</span> </div>
                </div>
            </form>
        </div>
    );
}