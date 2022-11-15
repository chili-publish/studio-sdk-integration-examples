import React, { FC, ReactNode } from 'react';

type ButtonProps = {
    onClick: () => void;
    isDisabled?: boolean;
    children: ReactNode
}

const Button: FC<ButtonProps> = (props) => {
    const {onClick, isDisabled = false, children} = props;

    return (
        <button onClick={onClick} disabled={isDisabled} >
            {children}
        </button>
    )
}

export default Button;