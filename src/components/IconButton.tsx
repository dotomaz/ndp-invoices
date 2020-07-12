import React, { FunctionComponent, ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ReactComponent as IconDelete } from '../svg/delete.svg';
import { ReactComponent as IconEdit } from '../svg/edit.svg';
import { ReactComponent as IconPrint } from '../svg/accounting.svg';
import { ReactComponent as IconDuplicate } from '../svg/duplicate.svg';

const Button = styled.button`
    height: 1em;
    width: 1em;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    position: relative;

    svg{
        height: 1em;
        width: 1em;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

interface Props {
    className?: string;
    onClick?: MouseEventHandler;
    icon: 'edit' | 'delete' | 'print' | 'duplicate';
    tooltip?: 'top' | 'left' | 'right' | 'bottom';
    title?: string;
};

const getIcon = (name: String): ReactElement | null => {
    switch(name){
        case 'delete': return (<IconDelete />); break;
        case 'edit': return (<IconEdit />); break;
        case 'print': return (<IconPrint />); break;
        case 'duplicate': return (<IconDuplicate />); break;
        default:
            break;
    }
    return null;
}

const IconButtonComponent: FunctionComponent<Props> = (props) => {
    const key = `${(new Date()).getTime()}-${Math.random() * 100000}`;

    return (
        <>
            { !!props.tooltip && (
                <span style={{display: 'flex'}} className={props.className}>
                    <OverlayTrigger
                        key={key}
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-${key}`}>
                            {props.title}
                        </Tooltip>
                        }
                    >
                        <Button onClick={props.onClick}>
                            {getIcon(props.icon)}
                        </Button>
                    </OverlayTrigger>
                </span>
            )}

            { !props.tooltip && (
                <Button className={props.className} onClick={props.onClick}>
                    {getIcon(props.icon)}
                </Button>
            )}
        </>
    )
};

export default IconButtonComponent;
