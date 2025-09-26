import { useState } from 'react'
import '../css/answerOption.css'


export enum option {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

interface answerOptionProps {
    optionName: option,
    optionContent: string,
    answers: string[],
    setAnswers: Function,
    questionNumber: number,
    selectedField: boolean,
    setSelectedField: Function,
    setSelectedFieldA: Function,
    setSelectedFieldB: Function,
    setSelectedFieldC: Function,
    setSelectedFieldD: Function
}



export function AnswerOption(props: answerOptionProps) {

    function handleBorder(): boolean {
        if (props.answers[props.questionNumber] === props.optionName) {
            return true
        }
        else {
            if (props.selectedField)
                return true
        }

        return false
    }

    function handleAnswerChosen() {
        props.setSelectedField(!props.selectedField)
        if (props.optionName === option.A) {
            props.setSelectedFieldB(false)
            props.setSelectedFieldC(false)
            props.setSelectedFieldD(false)
        }

        if (props.optionName === option.B) {
            props.setSelectedFieldA(false)
            props.setSelectedFieldC(false)
            props.setSelectedFieldD(false)
        }

        if (props.optionName === option.C) {
            props.setSelectedFieldB(false)
            props.setSelectedFieldA(false)
            props.setSelectedFieldD(false)
        }

        if (props.optionName === option.D) {
            props.setSelectedFieldB(false)
            props.setSelectedFieldC(false)
            props.setSelectedFieldA(false)
        }
        let helpArray = props.answers
        helpArray[props.questionNumber] = props.optionName
        props.setAnswers(helpArray)
    }

    return (
        <div className="answer-option" onClick={handleAnswerChosen} style={{ border: handleBorder() ? "5px solid #0b0f1f" : "5px solid #25357B" }}>
            {props.optionName + ". " + props.optionContent}
        </div>
    );
}