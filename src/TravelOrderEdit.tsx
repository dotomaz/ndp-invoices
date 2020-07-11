import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import FormComponent from './components/FormComponent';

import { MainStoreContext } from './store/Main';

interface Props {
    userId?: string;
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

const Title2 = styled.h4`
    margin-bottom: 25px;
`;

const TravelOrderEdit: React.FunctionComponent<Props> = (props) => {
    const store = useContext(MainStoreContext);

    const onChange = (name: string, value: string) => {
        console.log(name, value);
        store.setTravelOrderParameter(name, value);

        switch(name){
            case 'start_date':
                    const date = new Date(value);
                    const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0);
                    store.setTravelOrderParameter('end_date', format(dateEnd, 'YYYY-MM-DD HH:mm:ss'));
                break;
            default:
                break;
        }

        const err = store.travelOrderGetError();
        props.isValid && props.isValid(!err.err);
        props.setError && props.setError(err.message);
    };

    return (
        <Container>
            <Title>{!!store.travelOrder.id ? "Kreiraj":"Uredi"} potni nalog</Title>
            <Title2>Trajanje potovanja in dnevnice</Title2>
            <FormComponent 
                type="date-time" 
                name="Začetek  potovanja"
                required
                value={store.travelOrder.start_date} 
                onChange={(value: string)=> onChange("start_date", value)} 
            />

            <FormComponent 
                type="date-time" 
                name="Konec potovanja"
                required
                value={store.travelOrder.end_date} 
                onChange={(value: string)=> onChange("end_date", value)} 
            />

            <FormComponent 
                type="checkbox" 
                name="Obračunaj dnevnice"
                value={store.travelOrder.per_diem?"1":"0"} 
                onChange={(value: string)=> onChange("per_diem", value)} 
            />

            { store.travelOrder.per_diem && (
                <FormComponent 
                    type="currency" 
                    name="Znesek dnevnice"
                    value={`${store.travelOrder.per_diem_amount}`.replace(/\./,',')} 
                    onChange={(value: string)=> onChange("per_diem_amount", value)} 
                />
            )}

            <hr />

            <Title2>Podatki o zaposlenem</Title2>

            <FormComponent 
                type="select" 
                name="Ime in priimek"
                required
                value={store.travelOrder.user && store.travelOrder.user.id}
                values={store.usersSelectValues}
                onChange={(value: string)=> onChange("user", value)} 
            />

            <FormComponent 
                type="select" 
                name="Po nalogu"
                required
                value={store.travelOrder.ordered_by && store.travelOrder.ordered_by.id}
                values={store.usersSelectValues}
                onChange={(value: string)=> onChange("ordered_by", value)} 
            />

            <FormComponent 
                type="select" 
                name="Način naročila"
                required
                value={store.travelOrder.order_type}
                values={store.orderTypeSelectValues}
                onChange={(value: string)=> onChange("order_type", value)} 
            />
            
            <hr />

            <Title2>Opis poti</Title2>

            <FormComponent 
                type="input" 
                name="Vozilo"
                required
                value={store.travelOrder.vehicle}
                onChange={(value: string)=> onChange("vehicle", value)} 
            />

            <FormComponent 
                type="distance" 
                name="Število prevoženih kilometrov"
                required
                value={`${store.travelOrder.distance}`} 
                onChange={(value: string)=> onChange("distance", value)} 
            />

            <FormComponent 
                type="currency" 
                name="Cena kilometra"
                required
                value={`${store.travelOrder.price_per_km}`.replace(/\./,',')} 
                onChange={(value: string)=> onChange("end_date", value)} 
            />


            <FormComponent 
                type="input" 
                name="Cilj potovanja"
                required
                value={store.travelOrder.destination}
                onChange={(value: string)=> onChange("destination", value)} 
            />

            <FormComponent 
                type="input" 
                name="Namen potovanja"
                required
                value={store.travelOrder.purpose_of_the_trip} 
                onChange={(value: string)=> onChange("purpose_of_the_trip", value)} 
            />

            <FormComponent 
                type="input" 
                name="Opombe"
                value={store.travelOrder.description} 
                onChange={(value: string)=> onChange("description", value)} 
            />

            <FormComponent 
                type="currency" 
                name="Znesek potnega naloga"
                disabled
                value={`${store.travelOrderAmmount || ''}`} 
            />

            <hr />

            <FormComponent 
                type="textarea" 
                name="Poročilo o opravljeni poti"
                value={store.travelOrder.report} 
                onChange={(value: string)=> onChange("report", value)} 
            />
        </Container>
    );
};

export default observer(TravelOrderEdit);
