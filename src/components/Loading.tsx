import React from 'react';
import styled from 'styled-components';

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
            <IconSpinner />
        </Container>
    )
};

export default SpinnerComponent;
