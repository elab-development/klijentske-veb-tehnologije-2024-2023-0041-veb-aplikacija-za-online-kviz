import '../css/signin.css';
import logo from '../img/logo.png'
import { InputText } from './InputText';
import { InputType } from './InputText';
import rightArrow from '../img/arrow-right.png'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '../modules/User';
import { useNavigate } from 'react-router-dom';
import { dataUser } from '../modules/User';
import { useEffect } from 'react';


export function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("currentUser") != null) {
            navigate('/home')
        }
    })

    const schema = yup.object().shape({
        username: yup.string().required("Username is required").min(3).max(9),
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup.string().min(5).max(15).required("Password is required"),
        repeatPassword: yup.string().oneOf([yup.ref("password")], "Passwords must be the same").required("Repeating the password is required")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    interface dataOrg {
        username: string;
        email: string;
        password: string;
        repeatPassword: string;
    }


    function onSubmit(data: object) {
        let dataOrg: dataOrg = {
            username: "default1",
            email: "default1",
            password: "default1",
            repeatPassword: "default1"
        };
        let i: number = 0;
        Object.keys(data).forEach(key => {
            let value = data[key as keyof typeof data]
            if (i == 0)
                dataOrg.username = value

            if (i == 1)
                dataOrg.email = value

            if (i == 2)
                dataOrg.password = value

            i++

        })

        let newUser: User = new User(dataOrg.username, dataOrg.email, dataOrg.password)
        if (!newUser.addUser()) {
            alert("Username or email already exists")
            return
        }

        let currentUser: dataUser = {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            id: newUser.id,
        }

        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        navigate('/home')
    }

    return (
        <div id='signInPage'>
            <img id='logoSigIn' src={logo} />
            <form className='inputContainer' onSubmit={handleSubmit(onSubmit)} >
                <div className='inputContainerTop'>SIGN-IN</div>
                <div className='inputContainerMiddle'>
                    <InputText type={InputType.Username} handle={register} name="username" error={errors.username?.message} />
                    <InputText type={InputType.Email} handle={register} name="email" error={errors.email?.message} />
                    <InputText type={InputType.Password} handle={register} name="password" error={errors.password?.message} />
                    <InputText type={InputType.RepeatPassword} handle={register} name="repeatPassword" error={errors.repeatPassword?.message} />
                </div>
                <div className='inputContainerBottom'>
                    <button type='submit' className='submitButton'>
                        <img src={rightArrow} className='rightArrow' />
                    </button>


                    <div className='TextForm'>If you already have an account <span className='clickTextForm' onClick={() => { navigate('/log-in') }}>log-in</span> </div>
                </div>
            </form >
        </div >
    );
}