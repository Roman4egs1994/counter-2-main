import React, {ChangeEvent, useState} from 'react';
import {Button} from "./Button";
import s from './Counter.module.css'

type CounterPropsType = {
    name: string
}


export const Counter = (props: CounterPropsType) => {

    let count = 0
    const [counter, setCounter] = useState(count)
    const [valueMax, setValueMax] = useState(0)
    const [valueStart, setValueStart] = useState(0)
    const [error,setError] = useState<string | null>('Установите значение Max и Start')

    //ИНПУТЫ
    const onChangeInputMax = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValueMax = event.currentTarget.valueAsNumber
        setValueMax(inputValueMax)

        if (inputValueMax < 0) {
            setError("Max не может быть меньше нуля")
        } else if (inputValueMax > valueStart) {
            setError("Установите значение Max и Start")
        } else  if (inputValueMax === valueStart) {
            setError('Max не может быть равен Start')
        } else if (inputValueMax < valueStart) {
            setError('Max не может быть меньше Start')
        }

        console.log('inputValueMax', inputValueMax)
    }
    const onChangeInputStart = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValueStart = event.currentTarget.valueAsNumber
        setValueStart(inputValueStart)

        if (inputValueStart >= 0 && inputValueStart < valueMax && inputValueStart !== valueMax ) {
            setValueStart(inputValueStart)
        }

        if (inputValueStart < 0) {
            setError('Стартовое значение не может быть меньше нуля')
        } else if (inputValueStart === valueMax) {
            setError('Start и Max не могут быть одинаковыми')
        } else if (inputValueStart > valueMax) {
            setError('Start не может быть больше Max')
        }


        // else if (inputValueStart === 0 && valueMax === 0){
        //     setError('Установите значения Start и Max')
        // }


        console.log('inputValueStart', inputValueStart)
    }


    //BUTTONS
    const onClickSetButtonHandler = () => {
        setCounter(valueStart)
    }
    const onClickIncrementClick = () => {
        setValueStart(valueStart)
        setCounter(counter + 1)
    }
    const onClickNullButtonHandler = () => {
        setCounter(0)
    }


    //DISABLED
    const onClickDisabledSetHandler = () => {
        if (valueStart < 0) {
            return true
        } else if (valueStart === valueMax) {
            return true
        } else if (valueStart > valueMax) {
            return  true
        } else  if (valueMax < 0) {
            return true
        }
    }


    return (
        <>
            <div>
                <h1 className={s.title}>asd</h1>
                <div className={s.wrapper}>
                    <div className={s.counterWrapper}>
                        <div className={s.scoreboard}>
                            <div className={s.valueMax}>
                                <p>max value:</p>
                                <input
                                    value={valueMax}
                                    className={s.inputMax}
                                    type={"number"}
                                    onChange={onChangeInputMax}
                                />
                            </div>
                            <div className={s.valueStart}>
                                <p>start value:</p>
                                <input
                                    value={valueStart}
                                    className={s.inputStart}
                                    type={"number"}
                                    onChange={onChangeInputStart}
                                />
                            </div>
                        </div>

                        <div className={s.wrapperButtons}>
                            <Button disabled={onClickDisabledSetHandler()} className={s.setButton} nameButton={'set'}
                                    callBack={onClickSetButtonHandler}/>
                        </div>

                    </div>
                </div>
            </div>


            <div className={s.back}>
                <h1 className={s.title}>{props.name}</h1>
                <div className={s.wrapper}>
                    <div className={s.counterWrapper}>
                        <div className={s.scoreboard}>
                            <div className={s.counterNumber}>
                                {counter}
                                <div className={s.error}>{error}</div>
                            </div>
                        </div>

                        <div className={s.wrapperButtons}>
                            <Button
                                disabled={false}
                                className={s.setButton}
                                nameButton={'inc'}
                                callBack={onClickIncrementClick}
                            />

                            <Button
                                disabled={false}
                                className={s.setButton1}
                                nameButton={'reset'}
                                callBack={onClickNullButtonHandler}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>


    );
};

