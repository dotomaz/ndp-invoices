import React, { useContext , useState} from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import FormComponent from './components/FormComponent';
import BaseButton from './components/Button';

import { MainStoreContext } from './store/Main';

interface Props {
    invoicePeriodId?: number;
    path?: string;
    isValid?: Function;
}

const Container = styled.div`
    padding: 10px 25px;
    margin: 30px auto;
    max-width: 500px;
    background-color: #eee;
    border-radius: 4px;
`;

const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
`;
const Title = styled.h2`
    margin-bottom: 50px;
`;

const InvoicePeriodEdit: React.FunctionComponent<Props> = (props) => {
    const store = useContext(MainStoreContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = () => {
        store.Login(email, password);
    }

    return (
        <Container>
            <Title>Prijava</Title>
            <FormComponent 
                type="input" 
                name="E-mail"
                required
                value={`${email}`} 
                onChange={(value: string)=> setEmail(value)} 
            />
            <FormComponent 
                type="password" 
                name="Geslo"
                required
                value={`${password}`} 
                onChange={(value: string)=> setPassword(value)}
                onKeyPress={(ev:any) => {
                    if (ev.key === 'Enter') {
                        Login();
                    }
                }}
            />
            <ButtonContainer>
                <BaseButton onClick={()=>Login()}>Prijava</BaseButton>
            </ButtonContainer>
        </Container>
    );
};

export default observer(InvoicePeriodEdit);
