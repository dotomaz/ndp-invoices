import React, { FunctionComponent } from 'react';

interface Props {
    className?: string;
}

const RowComponent: FunctionComponent<Props> = (props) => {

    return (
        <div className={`${props.className} row`}>
            {props.children}
        </div>
    )
};

export default RowComponent;
