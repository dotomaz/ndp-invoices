import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from './Button';

const Container = styled.div`
    z-index: 9999;

    & > div {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        transform: translate3d(0, 0, 0);
    }
`;

const Content = styled.div`
    display: flex;

    & > div {
        position: fixed;
        width: ${(props: ContentProps) => (props.width ? props.width : '33%')};
        background-color: #fff;
        box-shadow: -1px 0px 80px 10px rgba(91, 91, 91, 0.4);
        top: 0;
        right: 0;
        bottom: 0;
        flex: 1;
        flex-direction: column;
        transform: translate3d(0, 0, 0);
    }
`;

const ContentContainer = styled.div`
    height: calc(100vh - 90px);
    overflow-y: auto;
`;

const Footer = styled.div`
    display: flex;
    background-color: #FFCA59;
    flex-direction: row;
    align-items: center;
    height: 90px;
    padding: 0 48px;
`;

const Left = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

const Right = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

const Error = styled.div`
    color: red;
    margin-left: 15px;
`;

interface Props {
    ChildComponent: any;
    width?: string;
    confirmTitle?: string;
    cancelTitle?: string
    onClose?: Function;
    onConfirm?: Function;
}

interface ContentProps {
    width?: string;
    onClick?: Function;
}

const Sidebar: React.FunctionComponent<Props> = (props) => {
    const [sidebarState, setSidebarState] = useState('open');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState('');
    const [inProgress, setInProgress] = useState(false);

    const close = () => {
        setSidebarState('closed');
    };

    const save = () => {
        if (!valid) {
            return;
        }

        if (typeof props.onConfirm === 'function') {
            setInProgress(true);
            const promise = props.onConfirm();
            if (promise && typeof promise.then === 'function') {
                promise.then(() => {
                    setInProgress(false);
                    setSidebarState('closed');
                });
            } else {
                setInProgress(false);
                setSidebarState('closed');
            }
        } else {
            setSidebarState('closed');
        }
    };

    const onAnimationFinish = () => {
        if (sidebarState === 'closed' && props.onClose) {
            props.onClose();
        }
    };

    const bgVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 },
    };

    const sidebarVariants = {
        open: { x: '0%' },
        closed: { x: '100%' },
    };

    return (
        <Container onClick={() => close()}>
            <motion.div
                initial='closed'
                animate={sidebarState}
                variants={bgVariants}
                transition={{ ease: 'easeOut', duration: 0.4 }}
                onAnimationComplete={() => onAnimationFinish()}
            >
                <Content width={props.width} onClick={ev => ev.stopPropagation()}>
                    <motion.div
                        initial='closed'
                        animate={sidebarState}
                        variants={sidebarVariants}
                        transition={{ ease: 'easeOut', duration: 0.4 }}
                    >
                        <ContentContainer>
                            <props.ChildComponent 
                                isValid={(isValid: boolean) => setValid(isValid)} 
                                setError={(error: string) => setError(error)}
                            />
                        </ContentContainer>
                        <Footer>
                            <Left>
                                <Button onClick={() => close()}>
                                    {props.confirmTitle || 'Cancel'}
                                </Button>
                                {!!error && (
                                    <Error>{error}</Error>
                                )}
                            </Left>
                            <Right>
                                <Button disabled={!valid || inProgress} onClick={() => save()}>
                                    {props.confirmTitle || 'Save'}
                                </Button>
                            </Right>
                        </Footer>
                    </motion.div>
                </Content>
            </motion.div>
        </Container>
    );
};

export default Sidebar;
