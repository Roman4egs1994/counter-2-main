import React from 'react';

type TypePropsButton = {
    nameButton: string
    callBack:()=> void
    className?: string
    disabled?: boolean
}


export const Button = (props: TypePropsButton) => {

    const onclickButtonHandler = () => {
        props.callBack()
    }

    return (
        <button  disabled={props.disabled} className={props.className} onClick={onclickButtonHandler}>{props.nameButton}</button>
    );
};

