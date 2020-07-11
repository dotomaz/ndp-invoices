import React from 'react';
import { Router } from "@reach/router";
import styled from 'styled-components';

import { MainStoreContext, MainStore } from './store/Main';
import UserEdit from './UserEdit';
import UserList from './UserList';
import TravelOrderList from './TravelOrderList';
import Print from './Print';

function App() {
    return (
        <MainStoreContext.Provider value={new MainStore()}>
            <Router>
                <TravelOrderList path="/" />
                <UserEdit path="user-edit/:userId" />
                <UserList path="users" />
                <Print path="print/:travelOrderId" />
            </Router>
        </MainStoreContext.Provider>

    );
}

export default App;
