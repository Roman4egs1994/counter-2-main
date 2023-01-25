import React, {ChangeEvent} from 'react';
import s from "./Counter.module.css";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

type CounterSettingsPropsType = {
    title: string
    valueMax: number
    valueStart: number
    onChangeInputMax:(event: ChangeEvent<HTMLInputElement>) => void
    onChangeInputStart: (event: ChangeEvent<HTMLInputElement>) => void
    onClickSetButtonHandler: () =>void
}


export const CounterSettings:React.FC<CounterSettingsPropsType> = (props) => {
    const {
        title,
        valueMax,
        valueStart,
        onChangeInputMax,
        onChangeInputStart,
        onClickSetButtonHandler,
        ...otherProps
    } = props

    const disabledBtnSetHandler = () => {
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

    return (
        <div>
            <h1 className={s.title}>{title}</h1>
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
                        {/*<Button disabled={onClickDisabledSetHandler()} className={s.setButton} nameButton={'set'} callBack={onClickSetButtonHandler}/>*/}
                        <Button
                            disabled={disabledBtnSetHandler()}
                            className={s.setButton}
                            nameButton={'set'}
                            callBack={props.onClickSetButtonHandler}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

