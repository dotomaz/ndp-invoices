import React, { useState, useContext, useEffect } from 'react';
import { navigate } from "@reach/router"
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { Invoice } from './types/Invoice.interface';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import IconBaseButton from './components/IconButton';
import BaseRow from './components/Row';
import Col from './components/Col';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import InvoiceEdit from './InvoiceEdit';
import { MainStoreContext } from './store/Main';


interface Props {
    path?: string;
    invoicePeriodId?: number;
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

const Button = styled(BaseButton as any)`
    margin-right: 15px;
`;

const InvoiceList: React.FunctionComponent<Props> = ({invoicePeriodId}) => {
    const store = useContext(MainStoreContext);
    const [page, setPage] = useState<number>(1);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    useEffect(() => {
        store.getInvoices(invoicePeriodId || 0, 1);
    }, []);

    const editInvoice = (invoice: Invoice) => {
        store.invoice = {...invoice};
        setIsOpenSidebar(true);
    };

    const newInvoice = () => {
        store.newInvoice();
        setIsOpenSidebar(true);
    };


    const deleteInvoice = (invoice: Invoice) => {
        if(window.confirm('Ali ste prepričani, da želite odstraniti ta račun?')){
            store.deleteInvoice(invoice.id).then(() => {
                store.getInvoices(invoicePeriodId || 0, page);
            });
        }
    };


    return (
        <PageContainer>
            <Button onClick={() => newInvoice()}>Novi račun</Button>

            <Button onClick={() => newInvoice()}>Uvozi podatke iz tabele</Button>

            {store.invoicesLoading && (
                <Loading />
            )}

            { ( !store.invoicesLoading && !store.invoices.length ) && (
                <Empty>Ni računov.</Empty>
            )}

            { ( !store.invoicesLoading && !!store.invoices.length ) && (
                <div className="container-fluid">
                    <Header>
                        <Col1 sizes={['md-2']}>Ime otroka</Col1>
                        <Col1 sizes={['md-2']}>Ime starša</Col1>
                        <Col1 sizes={['md-2']}>Email</Col1>
                        <Col1 sizes={['md-2']}>Znesek</Col1>
                        <Col1 sizes={['md-2']}>Referenca</Col1>
                        <Col3 sizes={['md-2']}>
                        </Col3>
                    </Header>
                { store.invoices.map((invoice: Invoice, i: number) => { return (
                    <Row key={invoice.id}>
                        <Col1 sizes={['md-2']}>{invoice.child_name}</Col1>
                        <Col1 sizes={['md-2']}>{invoice.parent_name}</Col1>
                        <Col1 sizes={['md-2']}>{invoice.email}</Col1>
                        <Col1 sizes={['md-2']}>{invoice.price}</Col1>
                        <Col1 sizes={['md-2']}>{invoice.reference}</Col1>
                        <Col3 sizes={['md-2']}>
                            <IconButton 
                                icon="edit" 
                                onClick={() => editInvoice(invoice)}
                                tooltip="bottom"
                                title="Uredi račun"
                            ></IconButton>
                            <IconButton 
                                icon="delete" 
                                onClick={() => deleteInvoice(invoice)}
                                tooltip="bottom"
                                title="Odstrani račun"
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
                            .saveInvoice()
                            .then(() => {
                                setIsOpenSidebar(false);
                                store.getInvoices(invoicePeriodId || 0, 1);
                            });

                    }}
                    ChildComponent={InvoiceEdit}
                />
            )}
        </PageContainer>
    );
};

export default observer(InvoiceList);
