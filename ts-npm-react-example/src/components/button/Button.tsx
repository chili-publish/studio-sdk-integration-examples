import React, { FC, ReactNode } from 'react';

import './Button.css'

type ButtonProps = {
    onClick: () => void;
    isDisabled?: boolean;
    isHighlighted?: boolean;
    children: ReactNode
}

const Button: FC<ButtonProps> = (props) => {
    const {onClick, isDisabled = false, isHighlighted, children} = props;

    return (
        <button onClick={onClick} disabled={isDisabled} className={`button${isHighlighted ? ' active' : ''}`} >
            {children}
        </button>
    )
}

export default Button;