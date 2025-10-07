import '../css/comboBox.css'

interface comboBoxProps {
    name: string;
    listOptions: string[];
    state: Function;
    change?: Function
    selectedFirst?: boolean
}

export function ComboBox(props: comboBoxProps) {
    return (
        <select className='comboBox' onChange={event => {
            props.state(event.target.value)
            props.change && props.change(event.target.value)
        }}>
            <option selected>{props.name}</option>
            {
                props.listOptions.map(option => {
                    return <option style={{ fontWeight: (option === "+ADD QUIZ" || option === "+ADD QUESTION") ? "bolder" : "normal" }}>{option}</option>
                })
            }
        </select>

    );
}