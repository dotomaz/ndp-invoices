import React from 'react';
import styled from 'styled-components';
import { Link } from "@reach/router";

import { ReactComponent as IconHotel } from '../svg/hotel.svg';
import Row from './Row';
import Col from './Col';

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

const StyledIconHotel = styled(IconHotel)`
    height: 48px;

    path{
        fill: #F0533E;
    }
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-left: 15px;
`;

const HeaderComponent: React.FunctionComponent<Props> = (props) => {

    return (
        <Header>
            <Container>
                <Col1 sizes={['md-6']}>
                    <StyledIconHotel/>
                    <Title>Potni nalog</Title>
                </Col1>
                <Col2 sizes={['md-6']}>
                    <Link to="/">Potni nalogi</Link>
                    <Link to="/users">Uporabniki</Link>
                </Col2>
                
            </Container>
        </Header>
    )
};

export default HeaderComponent;
