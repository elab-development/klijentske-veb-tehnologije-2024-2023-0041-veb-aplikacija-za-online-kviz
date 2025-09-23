import '../css/comboBox.css'

interface comboBoxProps {
    name: string;
    listOptions: string[];
}

export function ComboBox(props: comboBoxProps) {
    return (
        <select className='comboBox'>
            <option selected>{props.name}</option>
            {
                props.listOptions.map(option => {
                    return <option>{option}</option>
                })
            }
        </select>

    );
}