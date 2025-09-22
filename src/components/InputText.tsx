import '../css/signin.css';

export enum InputType {
    Username = "Username",
    Email = "Email",
    Password = "Password",
    RepeatPassword = "Repeat password",
}


interface Props {
    type: InputType
}


export function InputText(props: Props) {
    return (
        <div className="inputText">
            <div className='inputText-label'>{props.type}</div>
            <input type="text" className='inputText-line' />
        </div>
    );
}