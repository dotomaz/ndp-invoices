import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { Invoice } from './types/Invoice.interface';
import { getHost } from './services/Host';

import { ReactComponent as IconDelete } from './svg/delete.svg';
import { ReactComponent as IconEdit } from './svg/edit.svg';
import { ReactComponent as IconPreview } from './svg/qr-code.svg';
import { ReactComponent as IconEmail } from './svg/email.svg';
import { ReactComponent as IconCheckmark } from './svg/checkmark.svg';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import PreviewImage from './components/Preview';
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

const Button = styled(BaseButton as any)`
    margin-right: 15px;
`;

const Link = styled.a`
    cursor: pointer;
`;

const Delete = styled(IconDelete)`
    height: 20px;
    width: 20px;
    margin-left: 5px;

    path {
        fill: #d33;
    }
`;

const Edit = styled(IconEdit)`
    height: 20px;
    margin-left: 10px;
`;

const Preview = styled(IconPreview)`
    height: 20px;
    margin-left: 5px;
`;

const Email = styled(IconEmail)`
    height: 20px;
    margin-left: 5px;
`;
const Checkmark = styled(IconCheckmark)`
    height: 20px;
`;

const Filter = styled.div`
    padding: 20px 0 0;
`;

const FilterItem = styled.label`
    margin-right: 15px;
`;

const InvoiceList: React.FunctionComponent<Props> = ({invoicePeriodId}) => {
    const store = useContext(MainStoreContext);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<number>(0);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    useEffect(() => {
        store.getInvoices(invoicePeriodId || 0, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const editInvoice = (invoice: Invoice) => {
        store.invoice = {...invoice};
        setIsOpenSidebar(true);
    };

    const refreshInvoice = () => {
        store.getInvoices(invoicePeriodId || 0, 1);
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

    const sendInvoice = (invoice: Invoice) => {
        if(window.confirm('Ali ste prepričani, da želite poslati to položnico na '+ invoice.email +'?')){
            store.sendInvoice(invoice).then(() => {
                window.alert("Položnica je bila poslana.")
            });
        }
    };

    const sendAllInvoices = () => {
        if(window.confirm('Ali ste prepričani, da želite poslati vse položnice?')){
            store.sendAllInvoices(invoicePeriodId || 0).then(() => {
                window.alert("Položnice so bile poslane.")
            });
        }
    };

    const previewInvoice = (invoice: Invoice) => {
        setPreviewImage(`${getHost()}/api/invoice-form/${invoice.id}`);
    };


    const importData = () => {
        window.open(`${getHost()}/api/import-data/${invoicePeriodId}`, '_blank');
    };

    const teams: number[] = [];
    store.invoices.forEach((invoice) => {
        if (teams.indexOf(invoice.team) < 0) {
            teams.push(invoice.team);
        }
    });
    teams.sort((a,b) => {
        const aa = a < 10 ? `0${a}` : `${a}`;
        const bb = b < 10 ? `0${b}` : `${b}`;
        return aa === bb ? 0 : aa < bb ? -1 : 1;
    });


    return (
        <PageContainer>
            <Button onClick={() => refreshInvoice()}>Osveži podatke</Button>

            <Button onClick={() => newInvoice()}>Novi račun</Button>

            <Button onClick={() => importData()}>Uvozi podatke iz tabele</Button>

            <Button onClick={() => sendAllInvoices()}>Pošlji položnice na email</Button>

            <h1 style={{marginTop: 25}}>{store.invoicePeriodText}</h1>

            {store.invoicesLoading && (
                <Loading />
            )}

            { ( !store.invoicesLoading && !store.invoices.length ) && (
                <Empty>Ni računov.</Empty>
            )}

            { ( !store.invoicesLoading && !!store.invoices.length ) && (
                <>
                    { !!teams?.length && (
                        <Filter>
                            <FilterItem>
                                <input 
                                    type="radio" 
                                    name="filter"
                                    value="vsi"
                                    checked={filter === 0}
                                    onClick={() => setFilter(0)}
                                /> {" "}
                                Vsi
                            </FilterItem>
                            {teams.map(team => (
                                <FilterItem>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="team"
                                        checked={filter === team}
                                        onClick={() => setFilter(team)}
                                    /> {" "}
                                    U{team}
                                </FilterItem>

                            ))}

                        </Filter>
                    )}
                
                    <Table>
                        <thead>
                            <Row>
                                <HeaderCol></HeaderCol>
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
                        { store.invoices
                            .filter((invoice: Invoice) => filter > 0 ? invoice.team === filter : true )
                            .map((invoice: Invoice, i: number) => { return (
                            <Row key={invoice.id}>
                                <Col>
                                    {!!invoice.sent && (
                                        <Checkmark />
                                    )}
                                </Col>
                                <Col>U{invoice.team}</Col>
                                <Col>{invoice.child_name}</Col>
                                <Col>{invoice.parent_name}</Col>
                                <Col>{invoice.email}</Col>
                                <Col>{invoice.price}€</Col>
                                <Col>{invoice.reference}</Col>
                                <Col style={{textAlign: 'right'}}>
                                    <Link onClick={() => previewInvoice(invoice)} ><Preview /></Link> {" "}
                                    <Link onClick={() => editInvoice(invoice)} ><Edit /></Link> {" "}
                                    <Link onClick={() => sendInvoice(invoice)} ><Email /></Link> {" "}
                                    <Link onClick={() => deleteInvoice(invoice)} ><Delete /></Link> {" "}
                                </Col>
                            </Row>
                        );}) }
                        </tbody>
                </Table>
                </>
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

            {!!previewImage.length && (
                <PreviewImage image={previewImage} onClose={() => setPreviewImage('')} />
            )}
        </PageContainer>
    );
};

export default observer(InvoiceList);
