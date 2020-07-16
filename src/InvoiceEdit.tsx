import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import FormComponent from './components/FormComponent';

import { MainStoreContext } from './store/Main';

interface Props {
    invoiceId?: string;
    path?: string;
    isValid?: Function;
    setError?: Function;
}

const Container = styled.div`
    padding: 10px 25px;
`;

const Title = styled.h3`
    margin-bottom: 50px;
`;

const InvoiceEdit: React.FunctionComponent<Props> = (props) => {
    const store = useContext(MainStoreContext);

    const onChange = (name: string, value: string) => {
        console.log(name, value);
        store.setInvoiceParameter(name, value);

        // switch(name){
        //     case 'start_date':
        //             const date = new Date(value);
        //             const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0);
        //             store.setTravelOrderParameter('end_date', format(dateEnd, 'YYYY-MM-DD HH:mm:ss'));
        //         break;
        //     default:
        //         break;
        // }

        const err = store.invoiceGetError();
        props.isValid && props.isValid(!err.err);
        props.setError && props.setError(err.message);
    };

    return (
        <Container>
            <Title>{!!store.invoice.id ? "Kreiraj":"Uredi"} račun</Title>
           
            <FormComponent 
                type="input" 
                name="Ime otroka"
                required
                value={store.invoice.child_name}
                onChange={(value: string)=> onChange("child_name", value)} 
            />

            <FormComponent 
                type="input" 
                name="Ime starša"
                required
                value={store.invoice.parent_name}
                onChange={(value: string)=> onChange("parent_name", value)} 
            />

            <FormComponent 
                type="input" 
                name="Email"
                required
                value={store.invoice.email}
                onChange={(value: string)=> onChange("email", value)} 
            />

            <FormComponent 
                type="input" 
                name="Naslov"
                required
                value={store.invoice.address}
                onChange={(value: string)=> onChange("address", value)} 
            />

            <FormComponent 
                type="input" 
                name="Pošta in kraj"
                required
                value={store.invoice.city}
                onChange={(value: string)=> onChange("city", value)} 
            />

            <FormComponent 
                type="currency" 
                name="Znesek"
                value={`${store.invoice.price}`.replace(/\./,',')} 
                onChange={(value: string)=> onChange("price", value)} 
            />

            <FormComponent 
                type="checkbox" 
                name="Znižana vadnina"
                value={store.invoice.discount < 1?"1":"0"} 
                onChange={(value: string)=> onChange("discount", value)} 
            />

        </Container>
    );
};

export default observer(InvoiceEdit);
