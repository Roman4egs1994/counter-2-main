import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button} from "../Button/Button";
import s from './Counter.module.css'
import {CounterSettings} from "./CounterSettings";
import {CounterIncrement} from "./CounterIncrement";

type CounterPropsType = {
    name: string
}


export const Counter = (props: CounterPropsType) => {

    const [counterStart, setCounterStart] = useState<number>(()=> {
        let counterStartAsString = localStorage.getItem('counterStartLoc')
        if (counterStartAsString) {
            let newValue = JSON.parse(counterStartAsString)
            return newValue
        } else return  1
    })
    const [counterEnd, setCounterEnd] = useState<number>(0)
    const [valueMax, setValueMax] = useState<number>(0)
    // const [valueMax, setValueMax] = useState<number>(()=> {
    //     let valueAsStringMax = localStorage.getItem('valueMaxLoc')
    //     if (valueAsStringMax) {
    //         let newValue = JSON.parse(valueAsStringMax)
    //         return newValue
    //     } else return  1
    // })
    const [valueStart, setValueStart] = useState<number>(0)
    // const [valueStart, setValueStart] = useState<number>(()=> {
    //     let valueAsStringStart = localStorage.getItem('valueStartLoc');
    //     if (valueAsStringStart) {
    //         let newValue = JSON.parse(valueAsStringStart)
    //         return newValue
    //     } else return  1
    // })
    const [error, setError] = useState<string | null>('Установите значение Max и Start')



    //Получение LocalStorage на инпуты
    // useEffect(()=> {
    //     localStorage.setItem('valueMaxLoc', JSON.stringify(valueMax))
    // },[valueMax])
    // useEffect(()=> {
    //     localStorage.setItem('valueStartLoc', JSON.stringify(valueStart))
    // },[valueStart])
    //
    // //Получение LocalStorage на  counterStart
    // useEffect(()=> {
    //     localStorage.setItem('counterStartLoc', JSON.stringify(counterStart))
    // },[counterStart])



    //ИНПУТЫ
    const onChangeInputMax = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValueMax = event.currentTarget.valueAsNumber
        setValueMax(inputValueMax)

        if (inputValueMax < 0) {
            setError("Max не может быть меньше нуля")
        } else if (inputValueMax > valueStart) {
            setError("Установите значение Max и Start")
        } else if (inputValueMax === valueStart) {
            setError('Max не может быть равен Start')
        } else if (inputValueMax < valueStart) {
            setError('Max не может быть меньше Start')
        } else if (Number.isNaN(valueMax)) {
            setError('Введите Max и Start')
        }
    }
    const onChangeInputStart = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValueStart = event.currentTarget.valueAsNumber
        setValueStart(inputValueStart)

        if (inputValueStart < 0) {
            setError('Start не может быть меньше нуля')
        } else if (inputValueStart === valueMax) {
            setError('Start и Max не могут быть одинаковыми')
        } else if (inputValueStart > valueMax) {
            setError('Start не может быть больше Max')
        } else if (Number.isNaN(valueStart)) {
            setError('Введите Start и Max')
        }
    }

    //BUTTONS
    // onClickSetButtonHandler иницилицазия стартового стейта и максимального
    const onClickSetButtonHandler = () => {
        setCounterStart(valueStart)
        setCounterEnd(valueMax)
        setError(null)
    }
    const onClickIncrementClick = () => {
        setCounterStart(counterStart + 1)
    }

    const onClickNullButtonHandler = () => {
        setCounterStart(valueStart)
    }


    //DISABLED
    // const onClickDisabledSetHandler = () => {
    //     if (valueStart < 0) {
    //         return true
    //     } else if (valueStart === valueMax) {
    //         return true
    //     } else if (valueStart > valueMax) {
    //         return true
    //     } else if (valueMax < 0) {
    //         return true
    //     } else if (Number.isNaN(valueStart)) {
    //         return  true
    //     } else if (Number.isNaN(valueMax)) {
    //         return  true
    //     }
    // }

    // const onClickDisabledIncrementHandler = () => {
    //
    //     if(counterStart >= counterEnd) {
    //         return true
    //     }
    //     if (error) {
    //         return true
    //     }
    //
    // }

    // const onClickButtonDisabledHandler = () => {
    //     if (counterStart === valueStart) {
    //         return true
    //     }
    // }

    return (
        <>
            <CounterSettings
                title={'Settings'}
                valueMax = {valueMax}
                valueStart = {valueStart}
                onChangeInputMax = {onChangeInputMax}
                onChangeInputStart = {onChangeInputStart}
                onClickSetButtonHandler= {onClickSetButtonHandler}
            />
            <CounterIncrement
                title={'Counter'}
                error={error}
                counterStart = {counterStart}
                valueMax = {valueMax}
                valueStart = {valueStart}
                counterEnd = {counterEnd}
                onClickIncrementClick = {onClickIncrementClick}
                onClickNullButtonHandler = {onClickNullButtonHandler}
            />
        </>
    );
};

