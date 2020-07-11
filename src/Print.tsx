import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import { MainStoreContext } from './store/Main';

import Loading from './components/Loading';

interface Props {
    path?: string;
    travelOrderId?: string;
}
interface LineProps {
    marginBottom?: string;
}

const Container = styled.div`
    width: 1100px;
    background-color: #fff;
    padding: 10px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 140%;
    color: #000;
`;

const Title1 = styled.h1`
    font-family: Karla, Arial, Helvetica, sans-serif;
    font-size: 24px;
    font-weight: bold;
    margin: 1.5rem 0;
`;

const Title2 = styled.h2`
    font-family: Karla, Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin-top: 80px;
`;

const Line = styled.p`
    margin-bottom: ${(props: LineProps) => (props.marginBottom ? props.marginBottom : '0')};
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Row2 = styled(Row)`
    justify-content: space-between;
`;

const Col = styled.div`
    flex: 1 1;
`;

const Separator = styled.hr`
    border-top: 1px solid #000;
`;

const Table = styled.table`
    width: 100%;
`;

const THead = styled.thead`
    background-color: #ccc;
`;

const TBody = styled.tbody`
`;

const TR = styled.tr`
`;

const TH = styled.th`
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 140%;
    padding: 5px;
    
    &:last-child{
        text-align: right;
    }
`;
const TH50 = styled(TH)`
    width: 50%;
`;

const TD = styled.td`
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 140%;
    padding: 5px;

    &:last-child{
        text-align: right;
    }
`;
const TD50 = styled(TD)`
    width: 50%;
`;

const Signature = styled.div`
    margin-top: 80px;
    padding-bottom: 60px;
    border-bottom: 1px solid #000;
    width: 40%;
`;

const Print: React.FunctionComponent<Props> = (props) => {
    const store = useContext(MainStoreContext);

    useEffect(()=>{
        store.loadTravelOrder(props.travelOrderId || '');
    }, []);

    return (
        <Container>
            {store.travelOrderLoading && (
                <Loading />
            )}
            
            {store.travelOrderLoaded && (
            <>
                <Line><b>{store.company.title}</b></Line>
                <Line>{store.company.address}</Line>
                <Line marginBottom="1em">{store.company.postalCode} {store.company.city}</Line>
                <Line>{store.company.taxNumber}</Line>
                <Line>{store.company.accountNumber}</Line>
                <Separator />
                <Title1>Obračun potnih stroškov po nalogu {store.travelOrder.number}</Title1>


                <Line marginBottom="1em"><b>Predlagatelj</b></Line>
                <Row>
                    <Col>Ime in priimek:</Col>
                    <Col>{store.travelOrder.user && store.travelOrder.user.name}</Col>
                    <Col>Datum</Col>
                    <Col>{format(store.travelOrder.start_date, 'DD.MM.YYYY')}</Col>
                </Row>
                <Row>
                    <Col>Naslov:</Col>
                    <Col>{store.travelOrder.user && store.travelOrder.user.address}</Col>
                    <Col>Znesek predujema:</Col>
                    <Col>/</Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>{store.travelOrder.user && store.travelOrder.user.postalCode} {store.travelOrder.user && store.travelOrder.user.city}</Col>
                    <Col>Izplačan dne:</Col>
                    <Col>/</Col>
                </Row>

                { store.travelOrderDuration >= 8 && (
                    <>
                        <Title2>Dnevnice</Title2>
                        <Table>
                            <THead>
                                <TR>
                                    <TH>Datum odhoda</TH>
                                    <TH>Datum prihoda</TH>
                                    <TH>Odsotnost</TH>
                                    <TH>Št. dnevnic</TH>
                                    <TH>Cena dnevnice</TH>
                                    <TH>Znesek skupaj</TH>
                                </TR>
                            </THead>
                            <TBody>
                                <TR>
                                    <TD>{format(store.travelOrder.start_date, 'DD.MM.YYYY ob HH:mm')}</TD>
                                    <TD>{format(store.travelOrder.end_date, 'DD.MM.YYYY ob HH:mm')}</TD>
                                    <TD>{store.travelOrderDuration} ur</TD>
                                    <TD>1</TD>
                                    <TD>{`${store.travelOrder.per_diem_amount}`.replace(/\./,',')} EUR</TD>
                                    <TD><b>{`${store.travelOrder.per_diem_amount}`.replace(/\./,',')} EUR</b></TD>
                                </TR>
                            </TBody>
                            <THead>
                                <TR>
                                    <TH colSpan={5}>Skupaj</TH>
                                    <TH><b>{`${store.travelOrder.per_diem_amount}`.replace(/\./,',')} EUR</b></TH>
                                </TR>
                            </THead>
                        </Table>
                    
                    </>
                )}

                <Title2>Dnevnice</Title2>
                <Table>
                    <THead>
                        <TR>
                            <TH50>Vozilo</TH50>
                            <TH>Število KM</TH>
                            <TH>Cena KM</TH>
                            <TH>Znesek skupaj</TH>
                        </TR>
                    </THead>
                    <TBody>
                        <TR>
                            <TD>{store.travelOrder.vehicle}</TD>
                            <TD>{store.travelOrder.distance}</TD>
                            <TD>{`${store.travelOrder.price_per_km}`.replace(/\./,',')}</TD>
                            <TD>{`${(store.travelOrder.price_per_km || 0) * (store.travelOrder.distance||0)}`.replace(/\./,',')} EUR</TD>
                        </TR>
                    </TBody>
                </Table>

                <Title2>Stroški / Priloge</Title2>
                <Table>
                    <THead>
                        <TR>
                            <TH>Številka računa</TH>
                            <TH50>Opis</TH50>
                            <TH>Obračunano</TH>
                            <TH>Znesek z DDV</TH>
                        </TR>
                    </THead>
                    <TBody>
                        <TR>
                            <TD></TD>
                            <TD></TD>
                            <TD>Obračunani stroški:</TD>
                            <TD>0,00 EUR</TD>
                        </TR>
                    </TBody>
                </Table>

                <Title2></Title2>
                <Table>
                    <TBody>
                        <TR>
                            <TD50><b>Poročilo o opravljeni poti</b></TD50>
                            <TD>Skupaj:</TD>
                            <TD>{`${store.travelOrderAmmount}`.replace(/\./,',')} EUR</TD>
                        </TR>
                    </TBody>
                </Table>
                <Table>
                    <TBody>
                        <TR>
                            <TD50>{store.travelOrder.report}</TD50>
                            <TD>Predujem:</TD>
                            <TD>0,00 EUR</TD>
                        </TR>
                    </TBody>
                </Table>
                <Table>
                    <TBody>
                        <TR>
                            <TD50></TD50>
                            <TD><b>Izplačilo / vračilo:</b></TD>
                            <TD><b>{`${store.travelOrderAmmount}`.replace(/\./,',')} EUR</b></TD>
                        </TR>
                    </TBody>
                </Table>

                <Row2>
                    <Signature>Podpis predlagatelja:</Signature>
                    <Signature>Podpis odredbodajalca:</Signature>
                </Row2>

            </>
            )}
        </Container>
    );
};

export default observer(Print);
