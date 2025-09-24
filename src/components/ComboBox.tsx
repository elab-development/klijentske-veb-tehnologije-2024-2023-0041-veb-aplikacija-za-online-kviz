import '../css/comboBox.css'

interface comboBoxProps {
    name: string;
    listOptions: string[];
    state: Function;
}

export function ComboBox(props: comboBoxProps) {
    return (
        <select className='comboBox' onChange={event => { props.state(event.target.value) }}>
            <option selected>{props.name}</option>
            {
                props.listOptions.map(option => {
                    return <option>{option}</option>
                })
            }
        </select>

    );
}