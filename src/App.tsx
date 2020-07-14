import React from 'react';
import { Router } from "@reach/router";

import { MainStoreContext, MainStore } from './store/Main';
import InvoicePeriodList from './InvoicePeriodList';
import InvoiceList from './InvoiceList';
import Login from './Login';

function App() {
    return (
        <MainStoreContext.Provider value={new MainStore()}>
            <Router>
                <InvoicePeriodList path="/" />
                <InvoiceList path="period/:invoicePeriodId" />
                <Login path="/prijava" />
            </Router>
        </MainStoreContext.Provider>

    );
}

export default App;
