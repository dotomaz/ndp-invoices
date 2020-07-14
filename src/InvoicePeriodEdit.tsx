import React, { useContext , useEffect} from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import FormComponent from './components/FormComponent';

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

    useEffect(()=> {
        console.log(store.invoicePeriod);
    })

    const onChange = (name: string, value: string) => {
        store.setInvoicePeriodParameter(name, value);
        props.isValid && props.isValid(store.invoicePeriodIsValid());
    };

    return (
        <Container>
            <Title>{!!props.invoicePeriodId ? "Uredi obračunsko obdobje" : "Dodaj obračunsko obdobje"}</Title>
            <FormComponent 
                type="input" 
                name="Leto"
                required
                value={`${store.invoicePeriod.year}`} 
                onChange={(value: string)=> onChange("year", value)} 
            />
            <FormComponent 
                type="input" 
                name="Mesec"
                required
                value={`${store.invoicePeriod.month}`} 
                onChange={(value: string)=> onChange("month", value)} 
            />
        </Container>
    );
};

export default observer(InvoicePeriodEdit);
