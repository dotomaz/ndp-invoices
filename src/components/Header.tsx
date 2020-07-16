import React from 'react';
import styled from 'styled-components';
import { Link } from "@reach/router";

import Row from './Row';
import Col from './Col';

import logo from '../svg/ndp-logo.png';

interface Props {

}

const Header = styled.div`
    background-color: #fff;
    padding: 24px;
`;

const Container = styled(Row)`
    max-width: 1140px;
    margin: 0 auto;
`;

const Col1 = styled(Col)`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Col2 = styled(Col)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    a{
        color: #111111;
        margin-left: 30px;
    }
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-left: 15px;
`;

const Logo = styled.img`
    width: 80px;
`;

const HeaderComponent: React.FunctionComponent<Props> = (props) => {

    return (
        <Header>
            <Container>
                <Col1 sizes={['md-6']}>
                    <Logo src={logo} />
                    <Title>NDP POLOŽNICE</Title>
                </Col1>
                <Col2 sizes={['md-6']}>
                    <Link to="/">Seznam</Link>
                </Col2>
                
            </Container>
        </Header>
    )
};

export default HeaderComponent;
