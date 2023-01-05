import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button} from "./Button";
import s from './Counter.module.css'

type CounterPropsType = {
    name: string
}


export const Counter = (props: CounterPropsType) => {

    const [counterStart, setCounterStart] = useState<number>(()=> {
        let counterStartAsString = localStorage.getItem('valueStartLoc')
        if (counterStartAsString) {
            let newValue = JSON.parse(counterStartAsString)
            return newValue
        } else return  'Heelo'
    })
    const [counterEnd, setCounterEnd] = useState<number>(0)


    // const [valueMax, setValueMax] = useState<number>(0)
    const [valueMax, setValueMax] = useState<number>(()=> {
        let valueAsStringMax = localStorage.getItem('valueMaxLoc')
        if (valueAsStringMax) {
            let newValue = JSON.parse(valueAsStringMax)
            return newValue
        } else return  1
    })
    const [valueStart, setValueStart] = useState<number>(()=> {
        let valueAsStringStart = localStorage.getItem('valueStartLoc');
        if (valueAsStringStart) {
            let newValue = JSON.parse(valueAsStringStart)
            return newValue
        } else return  1
    })
    const [error, setError] = useState<string | null>('Установите значение Max и Start')



    //Получение LocalStorage на инпуты
    useEffect(()=> {
        localStorage.setItem('valueMaxLoc', JSON.stringify(valueMax))
    },[valueMax])
    useEffect(()=> {
        localStorage.setItem('valueStartLoc', JSON.stringify(valueStart))
    },[valueStart])

    //Получение LocalStorage на  counterStart
    useEffect(()=> {
        localStorage.setItem('counterStartLoc', JSON.stringify(counterStart))
    },[counterStart])



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

        console.log('inputValueMax', inputValueMax)
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
    const onClickDisabledSetHandler = () => {
        if (valueStart < 0) {
            return true
        } else if (valueStart === valueMax) {
            return true
        } else if (valueStart > valueMax) {
            return true
        } else if (valueMax < 0) {
            return true
        } else if (Number.isNaN(valueStart)) {
            return  true
        } else if (Number.isNaN(valueMax)) {
            return  true
        }
    }

    const onClickDisabledIncrementHandler = () => {

        if(counterStart >= counterEnd) {
            return true
        }
        if (error) {
            return true
        }

    }

    const onClickButtonDisabledHandler = () => {
        if (counterStart === valueStart) {
            return true
        }
    }

    return (
        <>
            <div>
                <h1 className={s.title}>Настройка</h1>
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
                            <div>
                                {error ? <div className={s.error}>{error}</div> : <div className={counterStart === valueMax ? s.counterNumberMax :  s.counterNumber}>{counterStart}</div> }
                            </div>
                        </div>

                        <div className={s.wrapperButtons}>
                            <Button
                                disabled={onClickDisabledIncrementHandler()}
                                className={counterStart === counterEnd ? s.setButtonIncDis : s.setButton}
                                nameButton={'inc'}
                                callBack={onClickIncrementClick}
                            />

                            <Button
                                disabled={onClickButtonDisabledHandler()}
                                className={counterStart === 0 ? s.setButtonResetDis :s.setButtonReset}
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

