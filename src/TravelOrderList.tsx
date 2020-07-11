import React, { useState, useContext, useEffect } from 'react';
import { navigate } from "@reach/router"
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { TravelOrder } from './types/TravelOrder.interface';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import IconBaseButton from './components/IconButton';
import BaseRow from './components/Row';
import Col from './components/Col';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import TravelOrderEdit from './TravelOrderEdit';
import { MainStoreContext } from './store/Main';


interface Props {
    path?: string;
}

const Row = styled(BaseRow)`
    padding: 5px 0;

    &:nth-child(odd){
        background-color: rgba(0,0,0, 0.05);
    }
`;

const Header = styled(BaseRow)`
    padding: 5px 0;
    background-color: rgba(0,0,0, 0.2);
    margin-top: 30px;
    font-weight: bold;
`;

const Empty = styled.p`
    margin-top: 30px;
`;

const Col1 = styled(Col)`
    font-size: 14px;
    font-weight: bold;
`;

const Col2 = styled(Col)`
    font-size: 14px;
`;

const Col3 = styled(Col)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const IconButton = styled(IconBaseButton)`
    margin-left: 5px;
    font-size: 20px;

    &:first-child{
        margin-left: 0px;
    }
`;

const TravelOrderList: React.FunctionComponent<Props> = () => {
    const store = useContext(MainStoreContext);
    const [page, setPage] = useState<number>(1);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    const editTravelOrder = (travelOrder: TravelOrder) => {
        store.travelOrder = {...travelOrder};
        setIsOpenSidebar(true);
    };

    const newTravelOrder = () => {
        store.newTravelOrder();
        setIsOpenSidebar(true);
    };

    const printTravelOrder = (travelOrder: TravelOrder) => {
        window.open(`/print/${travelOrder.id}`, '_blank');
    };

    const deleteTravelOrder = (travelOrder: TravelOrder) => {
        if(window.confirm('Ali ste prepričani, da želite odstraniti ta nalog?')){
            store.deleteTravelOrder(travelOrder.id).then(() => {
                store.getTravelOrders(page);
            });
        }
    };

    const duplicateTravelOrder = (travelOrder: TravelOrder) => {
        if(window.confirm('Ali ste prepričani, da želite kreirati novi nalog kot kopijo obstoječega?')){
            store.duplicateTravelOrder(travelOrder).then(() => {
                store.getTravelOrders(page);
            });
        }
    };

    return (
        <PageContainer>
            <BaseButton onClick={() => newTravelOrder()}>Novi potni nalog</BaseButton>

            {store.travelOrdersLoading && (
                <Loading />
            )}

            { ( !store.travelOrdersLoading && !store.travelOrders.length ) && (
                <Empty>Ni nalogov.</Empty>
            )}

            { ( !store.travelOrdersLoading && !!store.travelOrders.length ) && (
                <div className="container-fluid">
                    <Header>
                        <Col1 sizes={['md-2']}>#</Col1>
                        <Col1 sizes={['md-3']}>Ime in priimek</Col1>
                        <Col1 sizes={['md-2']}>V(na)</Col1>
                        <Col1 sizes={['md-2']}>Odhod / prihod</Col1>
                        <Col3 sizes={['md-3']}>
                        </Col3>
                    </Header>
                { store.travelOrders.map((travelOrder: TravelOrder, i: number) => { return (
                    <Row key={travelOrder.id}>
                        <Col2 sizes={['md-2']}>{travelOrder.number}</Col2>
                        <Col2 sizes={['md-3']}>{travelOrder.user && travelOrder.user.name}</Col2>
                        <Col2 sizes={['md-2']}>{travelOrder.destination}</Col2>
                        <Col2 sizes={['md-2']}>{travelOrder.start_date} / {travelOrder.end_date}</Col2>
                        <Col3 sizes={['md-3']}>
                            <IconButton 
                                icon="edit" 
                                onClick={() => editTravelOrder(travelOrder)}
                                tooltip="bottom"
                                title="Uredi potni nalog"
                            ></IconButton>
                            <IconButton 
                                icon="duplicate" 
                                onClick={() => duplicateTravelOrder(travelOrder)}
                                tooltip="bottom"
                                title="Ustvari novi potni nalog kot kopijo."
                            ></IconButton>
                            <IconButton 
                                icon="print" 
                                onClick={() => printTravelOrder(travelOrder)}
                                tooltip="bottom"
                                title="Natisni izračun potnega naloga"
                            ></IconButton>
                            <IconButton 
                                icon="delete" 
                                onClick={() => deleteTravelOrder(travelOrder)}
                                tooltip="bottom"
                                title="Odstrani potni nalog"
                            ></IconButton>
                        </Col3>
                    </Row>
                );}) }
                </div>
            )}

            {isOpenSidebar && (
                <Sidebar
                    width='66%'
                    onClose={() => setIsOpenSidebar(false)}
                    onConfirm={() => {
                        return store
                            .saveTravelOrder()
                            .then(() => {
                                setIsOpenSidebar(false);
                                store.getTravelOrders(1);
                            });

                    }}
                    ChildComponent={TravelOrderEdit}
                />
            )}
        </PageContainer>
    );
};

export default observer(TravelOrderList);
