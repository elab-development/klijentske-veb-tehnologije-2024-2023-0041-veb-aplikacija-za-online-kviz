import '../css/signin.css';

export enum InputType {
    Username = "Username",
    Email = "Email",
    Password = "Password",
    RepeatPassword = "Repeat password",
}


interface Props {
    type: InputType
    name: String
    register: Function
    error: string | undefined
}


export function InputText(props: Props) {
    return (
        <div className="inputText">
            <div className='inputText-label'>{props.type}</div>
            <input type={(props.name === 'password' || props.name === 'repeatPassword') ? "password" : "text"} className='inputText-line' {...props.register(props.name)} />
            <div className='errorContainer'>{props.error}</div>
        </div>
    );
}