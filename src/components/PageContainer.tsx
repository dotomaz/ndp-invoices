import React from 'react';
import styled from 'styled-components';

import Header from './Header';

const Container = styled.div`
    min-height: 100vh;
    background-color: #f8f8f8;
`;

const Content = styled.div`
    margin: 0 auto;
    padding-top: 48px;
    max-width: 1140px;

`;

interface Props {

}

const PageContainerComponent: React.FunctionComponent<Props> = (props) => {

    return (
        <Container>
            <Header />
            <Content>
                {props.children}
            </Content>
        </Container>
    )
};

export default PageContainerComponent;
