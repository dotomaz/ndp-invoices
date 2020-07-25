import React from 'react';
import styled from 'styled-components';
import Loading from 'react-loading';

import { ReactComponent as IconSpinner } from '../svg/spinner.svg';

interface Props {

}

const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const SpinnerComponent: React.FunctionComponent<Props> = (props) => {

    return (
        <Container>
            <Loading type="spinningBubbles" color="#666" width={100} height={100} />
        </Container>
    )
};

export default SpinnerComponent;
