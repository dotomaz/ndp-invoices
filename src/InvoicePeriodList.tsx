import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router'

import { InvoicePeriod } from './types/InvoicePeriod.interface';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import BaseRow from './components/Row';
import Col from './components/Col';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import InvoicePeriodEdit from './InvoicePeriodEdit';
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

`;

const Col2 = styled(Col)`

`;

const Col3 = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const Button = styled(BaseButton as any)`
    padding: 0px 5px;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 4px;

    &:first-child{
        margin-left: 0px;
    }
`;

const InvoicePeriodList: React.FunctionComponent<Props> = () => {
    const store = useContext(MainStoreContext);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const editInvoicePeriod = (invoicePeriod: InvoicePeriod) => {
        store.invoicePeriod = {...invoicePeriod};
        setIsOpenSidebar(true);
    };

    const newInvoicePeriod = () => {
        store.newInvoicePeriod();
        setIsOpenSidebar(true);
    };

    return (
        <PageContainer>
            <BaseButton onClick={() => newInvoicePeriod()}>Dodaj novo obračunsko obdobje</BaseButton>

            {store.invoicePeriodsLoading && (
                <Loading />
            )}

            { ( !store.invoicePeriodsLoading && !store.invoicePeriods.length ) && (
                <Empty>Ni podatkov.</Empty>
            )}

            { ( !store.invoicePeriodsLoading && !!store.invoicePeriods.length ) && (
                <div className="container-fluid">
                    <Header>
                        <Col1 sizes={['md-8']}>Obdobje</Col1>
                        <Col3 sizes={['md-4']}>
                        </Col3>
                    </Header>
                { store.invoicePeriods.map((invoicePeriod: InvoicePeriod, i: number) => { return (
                    <Row key={invoicePeriod.id}>
                        <Col1 sizes={['md-8']}>
                            <Link to={`/period/${invoicePeriod.id}`}>{store.months[invoicePeriod.month-1]} {invoicePeriod.year}</Link>
                        </Col1>
                        <Col3 sizes={['md-2']}>
                            <Button onClick={() => editInvoicePeriod(invoicePeriod)}>uredi</Button>
                            <Button>briši</Button>
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
                            .saveInvoicePeriod()
                            .then(() => {
                                setIsOpenSidebar(false);
                                store.getInvoicePeriods(1);
                            });
                        
                    }}
                    ChildComponent={InvoicePeriodEdit}
                />
            )}
        </PageContainer>
    );
};

export default observer(InvoicePeriodList);
