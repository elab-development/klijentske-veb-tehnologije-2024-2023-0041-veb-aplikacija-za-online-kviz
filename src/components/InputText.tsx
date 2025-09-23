import { couldStartTrivia } from 'typescript';
import '../css/signin.css';

export enum InputType {
    Username = "Username",
    Email = "Email",
    Password = "Password",
    RepeatPassword = "Repeat password",
}


interface Props {
    type?: InputType
    name?: String
    handle: Function
    error?: string | undefined
    login?: boolean;
    loginObject?: String[];
}



export function InputText(props: Props) {
    function updateDataLogin(event: React.ChangeEvent<HTMLInputElement>) {
        let changedArray: String[];
        if (props.loginObject != null)
            changedArray = props.loginObject;
        else
            return
        let value: string = event.target.value

        if (props.type === InputType.Username)
            changedArray[0] = value;

        if (props.type === InputType.Password)
            changedArray[1] = value;

        props.handle(changedArray)
    }


    if (props.login) {


        return (
            <div className="inputText">
                <div className='inputText-label'>{props.type}</div>
                <input type={(props.name === 'password' || props.name === 'repeatPassword') ? "password" : "text"} className='inputText-line' onChange={updateDataLogin} />
            </div>
        );
    }

    return (
        <div className="inputText">
            <div className='inputText-label'>{props.type}</div>
            <input type={(props.name === 'password' || props.name === 'repeatPassword') ? "password" : "text"} className='inputText-line' {...props.handle(props.name)} />
            <div className='errorContainer'>{props.error}</div>
        </div>
    );
}