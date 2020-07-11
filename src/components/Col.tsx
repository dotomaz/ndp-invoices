import React, { FunctionComponent } from 'react';

interface Props {
    className?: string;
    sizes: [string];
}

const ColComponent: FunctionComponent<Props> = (props) => {
    const classNames = props.sizes.map((val) => `col-${val}`).join(' ');

    return (
        <div className={`${props.className} ${classNames}`}>
            {props.children}
        </div>
    )
};

export default ColComponent;
