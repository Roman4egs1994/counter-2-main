import React from 'react';
import s from "./Counter.module.css";
import {Button} from "../Button/Button";

type CounterIncrementType = {
    title: string
    error: string | null
    counterStart: number
    valueMax: number
    counterEnd: number
    onClickIncrementClick: ()=> void
    onClickNullButtonHandler: ()=> void
    valueStart: number
}


export const CounterIncrement:React.FC<CounterIncrementType> = (props) => {

    const {
        title,
        error,
        counterStart,
        valueMax,
        counterEnd,
        onClickIncrementClick,
        onClickNullButtonHandler,
        valueStart,
        ...otherProps
    } = props

    const disabledIncHandler = () => {
        if(counterStart >= counterEnd) {
            return true
        }
        if (error) {
            return true
        }
    }

    const disabledBtnResetHandler = () => {
        if (counterStart === valueStart) {
            return true
        }
    }


    return (
        <div>
                <h1 className={s.title}>{title}</h1>
                <div className={s.wrapper}>
                    <div className={s.counterWrapper}>
                        <div className={s.scoreboard}>
                            <div>
                                {error ? <div className={s.error}>{error}</div> : <div className={counterStart === valueMax ? s.counterNumberMax :  s.counterNumber}>{counterStart}</div> }
                            </div>
                        </div>

                        <div className={s.wrapperButtons}>
                            <Button
                                disabled={disabledIncHandler()}
                                className={counterStart === counterEnd ? s.setButtonIncDis : s.setButton}
                                nameButton={'inc'}
                                callBack={onClickIncrementClick}
                            />

                            <Button
                                disabled={disabledBtnResetHandler()}
                                className={counterStart === 0 ? s.setButtonResetDis :s.setButtonReset}
                                nameButton={'reset'}
                                callBack={onClickNullButtonHandler}
                            />
                        </div>

                    </div>
                </div>
        </div>
    );
};

