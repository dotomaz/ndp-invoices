import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import FormComponent from './components/FormComponent';

import { MainStoreContext } from './store/Main';

interface Props {
    userId?: string;
    path?: string;
    isValid?: Function;
}

const Container = styled.div`
    padding: 10px 25px;
`;

const Title = styled.h2`
    margin-bottom: 50px;
`;

const UserEdit: React.FunctionComponent<Props> = (props) => {
    const store = useContext(MainStoreContext);

    const onChange = (name: string, value: string) => {
        store.setUserParameter(name, value);
        props.isValid && props.isValid(store.userIsValid());
    };

    return (
        <Container>
            <Title>{!!props.userId ? "Uredi uporabnika" : "Dodaj uporabnika"}</Title>
            <FormComponent 
                type="input" 
                name="Email"
                required
                value={store.user.email} 
                onChange={(value: string)=> onChange("email", value)} 
            />
            <FormComponent 
                type="input" 
                name="Ime in priimek"
                required
                value={store.user.name} 
                onChange={(value: string)=> onChange("name", value)} 
            />
            <FormComponent 
                type="input" 
                name="Naslov"
                value={store.user.address} 
                onChange={(value: string)=> onChange("address", value)} 
            />
            <FormComponent 
                type="input"
                name="Pošta"
                value={`${store.user.postalCode || ''}`} 
                onChange={(value: string)=> onChange("postalCode", value)} 
            />
            <FormComponent 
                type="input" 
                name="Kraj"
                value={store.user.city} 
                onChange={(value: string)=> onChange("city", value)} 
            />
            <FormComponent 
                type="input" 
                name="Telefon" 
                value={store.user.phone} 
                onChange={(value: string)=> onChange("phone", value)} 
            />
            <FormComponent 
                type="input" 
                name="TRR"
                value={store.user.trr} 
                onChange={(value: string)=> onChange("trr", value)} 
            />
        </Container>
    );
};

export default observer(UserEdit);
