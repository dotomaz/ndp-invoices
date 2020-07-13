import React, { useState, useContext, useEffect } from 'react';
import { navigate } from "@reach/router"
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { Invoice } from './types/Invoice.interface';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import IconBaseButton from './components/IconButton';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import InvoiceEdit from './InvoiceEdit';
import { MainStoreContext } from './store/Main';


interface Props {
    path?: string;
    invoicePeriodId?: number;
}

const Table = styled.table`
    margin-top: 25px;
    width: 100%;
`;

const Row = styled.tr`
    padding: 0;
    &:nth-child(odd){
        background-color: rgba(0,0,0, 0.05);
    }
`;

const Empty = styled.p`
    margin-top: 30px;
`;

const Col = styled.td`
    font-size: 12px;
    padding: 5px;
    line-height: 1;
`;

const HeaderCol = styled(Col as any)`
    font-weight: bold;
    background-color: rgba(0,0,0, 0.2);
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

const Link = styled(BaseButton as any)`
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 12px;
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

    const previewInvoice = (invoice: Invoice) => {
        window.open('/api/invoice-form/'+ invoice.id, '_blank');
    };


    const importData = () => {
        window.open('/api/import-data/'+ invoicePeriodId, '_blank');
    };


    return (
        <PageContainer>
            <Button onClick={() => newInvoice()}>Novi račun</Button>

            <Button onClick={() => importData()}>Uvozi podatke iz tabele</Button>

            <h1 style={{marginTop: 25}}>{store.invoicePeriodText}</h1>

            {store.invoicesLoading && (
                <Loading />
            )}

            { ( !store.invoicesLoading && !store.invoices.length ) && (
                <Empty>Ni računov.</Empty>
            )}

            { ( !store.invoicesLoading && !!store.invoices.length ) && (
                <Table>
                    <thead>
                        <Row>
                            <HeaderCol>Selekcija</HeaderCol>
                            <HeaderCol>Ime otroka</HeaderCol>
                            <HeaderCol>Ime starša</HeaderCol>
                            <HeaderCol>Email</HeaderCol>
                            <HeaderCol>Znesek</HeaderCol>
                            <HeaderCol>Referenca</HeaderCol>
                            <HeaderCol>
                            </HeaderCol>
                        </Row>
                    </thead>
                    <tbody>
                    { store.invoices.map((invoice: Invoice, i: number) => { return (
                        <Row key={invoice.id}>
                            <Col>U{invoice.team}</Col>
                            <Col>{invoice.parent_name}</Col>
                            <Col>{invoice.email}</Col>
                            <Col>{invoice.price}</Col>
                            <Col>{invoice.reference}</Col>
                            <Col style={{textAlign: 'right'}}>
                                <Link onClick={() => previewInvoice(invoice)} >predogled</Link> {" "}
                                <Link onClick={() => editInvoice(invoice)} >uredi</Link> {" "}
                                <Link onClick={() => deleteInvoice(invoice)} >odstrani</Link> {" "}
                                {/* <IconButton 
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
                                ></IconButton> */}
                            </Col>
                        </Row>
                    );}) }
                    </tbody>
                </Table>
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
