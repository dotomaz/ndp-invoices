import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Loading from 'react-loading';

interface Props {
    className?: string;
    image: string;
    onClose?: Function;
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    max-width: 80%;
`;

const Close = styled.a`
    position: absolute;
    top: 30px;
    right: 30px;
    width: 30px;
    height: 30px;

    &:before {
        display: block;
        content: '';
        border-top: 2px solid #fff;
        transform: rotate(45deg) translate3d(8px, 8px, 0);

    }

    &:after {
        display: block;
        content: '';
        border-top: 2px solid #fff;
        transform: rotate(-45deg) translate3d(-7px, 6px, 0);
    }
`;

const PreviewComponent: FunctionComponent<Props> = (props) => {
    const [visible, setVisible] = useState('open');
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const img = new Image();
        img.src = props.image;
        img.addEventListener('load', () => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const variants = {
        open: { opacity: 1 },
        closed: { opacity: 0 },
    };

    const onAnimationFinish = () => {
        if( visible === 'closed' && props.onClose){
            props.onClose();
        }
    }

    return (
        <motion.div 
            initial='closed'
            animate={visible}
            variants={variants}
            transition={{ ease: 'easeOut', duration: 0.4 }}
            onAnimationComplete={() => onAnimationFinish()}
        >
            <Container className={props.className} onClick={() => setVisible('closed')} >
                <Close onClick={() => setVisible('closed')} />
                {loading && (<Loading type="spinningBubbles" color="#fff" width={100} height={100} />)}
                {!loading && (<Img src={props.image} onClick={(ev) => ev.stopPropagation()} />)}
            </Container>
        </motion.div>
    )
};

export default PreviewComponent;
