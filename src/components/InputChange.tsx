import { use } from 'react';
import '../css/inputChange.css'
import { useState } from 'react';

interface InputChangeProps {
    label: string;
    locked: boolean;
    setLocked: Function;
    initialValue?: string;
    register: Function
    name: string;
}

export function InputChange(props: InputChangeProps) {

    function handlePasswordChange() {
        let stateValue = props.locked

        if (stateValue) {
            stateValue = true;
        }
        else {
            stateValue = false;
        }


        if (props.label === "PASSWORD" || props.label === "REPEAT PASSWORD") {
            stateValue = false;
        }


        props.setLocked(stateValue)


    }


    return (
        <div>
            <div>
                <div className="inputChangeLabel">{props.label + ":"}</div>
                <input {...props.register(props.name)} defaultValue={props.initialValue} onChange={handlePasswordChange} type="text" className="inputChange" disabled={props.label === "REPEAT PASSWORD" ? props.locked : false} style={{ opacity: (props.label === "REPEAT PASSWORD" && props.locked === true) ? "0.5" : "1" }} />
            </div>
        </div>
    );
}