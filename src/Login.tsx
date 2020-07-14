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
                name="Leto"
                required
                value={`${email}`} 
                onChange={(value: string)=> setEmail(value)} 
            />
            <FormComponent 
                type="input" 
                name="Mesec"
                required
                value={`${password}`} 
                onChange={(value: string)=> setPassword(value)} 
            />
            <BaseButton onClick={()=>Login()}>Prijava</BaseButton>
        </Container>
    );
};

export default observer(InvoicePeriodEdit);
