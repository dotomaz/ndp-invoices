import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { User } from './types/InvoicePeriod.interface';

import PageContainer from './components/PageContainer';
import BaseButton from './components/Button';
import BaseRow from './components/Row';
import Col from './components/Col';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import UserEdit from './UserEdit';
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

const Button = styled(BaseButton)`
    padding: 1px 5px;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 400;

    &:first-child{
        margin-left: 0px;
    }
`;

const UserList: React.FunctionComponent<Props> = () => {
    const store = useContext(MainStoreContext);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const editUser = (user: User) => {
        store.user = {...user};
        setIsOpenSidebar(true);
    };

    const newUser = () => {
        store.newUser();
        setIsOpenSidebar(true);
    };

    return (
        <PageContainer>
            <BaseButton onClick={() => newUser()}>Dodaj novega uporabnika</BaseButton>

            {store.usersLoading && (
                <Loading />
            )}

            { ( !store.usersLoading && !store.users.length ) && (
                <Empty>Ni uporabnikov.</Empty>
            )}

            { ( !store.usersLoading && !!store.users.length ) && (
                <div className="container-fluid">
                    <Header>
                        <Col1 sizes={['md-5']}>Ime in priimek</Col1>
                        <Col2 sizes={['md-5']}>Email</Col2>
                        <Col3 sizes={['md-2']}>
                        </Col3>
                    </Header>
                { store.users.map((user: User, i: number) => { return (
                    <Row key={user.id}>
                        <Col1 sizes={['md-5']}>{user.name}</Col1>
                        <Col2 sizes={['md-5']}>{user.email}</Col2>
                        <Col3 sizes={['md-2']}>
                            <Button onClick={() => editUser(user)}>uredi</Button>
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
                            .saveUser()
                            .then(() => {
                                setIsOpenSidebar(false);
                                store.getUsers(1);
                            });
                        
                    }}
                    ChildComponent={UserEdit}
                />
            )}
        </PageContainer>
    );
};

export default observer(UserList);
