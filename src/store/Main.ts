import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';
import { navigate } from "@reach/router";

import {Login as AuthLogin} from '../services/AuthService';
import AddInvoicePeriod from '../services/AddInvoicePeriod.graphql';
import AddInvoice from '../services/AddInvoice.graphql';
import DeleteInvoicePeriod from '../services/DeleteInvoicePeriod.graphql';
import DeleteInvoice from '../services/DeleteInvoice.graphql';
import UpdateInvoicePeriod from '../services/UpdateInvoicePeriod.graphql';
import UpdateInvoice from '../services/UpdateInvoice.graphql';
import GetInvoices from '../services/GetInvoices.graphql';
import GetInvoicePeriods from '../services/GetInvoicePeriods.graphql';
import InitService from '../services/Init.graphql';
import LoadInvoice from '../services/LoadInvoice.graphql';
import { InvoicePeriod } from '../types/InvoicePeriod.interface';
import { Invoice } from '../types/Invoice.interface';
import { assertValidExecutionArguments } from 'graphql/execution/execute';

const today = new Date();

export class MainStore {
    token = "";
    months = ['januar','februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'];
    invoicePeriodsLoading = false;
    invoicePeriodsLoaded = false;
    invoicePeriod: InvoicePeriod = {
        id: 0,
        month: today.getMonth()+1,
        year: today.getFullYear(),
    };

    invoicePeriods: InvoicePeriod[] = [];

    constructor(load: boolean = true){
        if(load){
            this.Init();
        }

        this.newInvoicePeriod();
        this.newInvoice();
    }

    async Login(email:string, password:string){
        try{
            const jwt = await AuthLogin(email, password);
            this.token = jwt?.access_token ?? '';

            if (!!this.token.length) {
                navigate('/');
            }

        }catch(e){
            alert('Prijava ni uspela!');
        }
    }

    async Init(){
        const service = new InitService(this.token);

        this.invoicePeriodsLoading = true;
        try{
            const data = await service.fetch(1);
            this.invoicePeriods = this.mapInvoicePeriods(data?.invoice_periods);
            
            this.invoicePeriodsLoading = false;
            this.invoicePeriodsLoaded = true;
        }catch(ex){
            this.invoicePeriodsLoading = false;
        }
    }

    newInvoicePeriod(){
        this.invoicePeriod = {
            id: 0,
            month: today.getMonth()+1,
            year: today.getFullYear(),
        };
    }

    get invoicePeriodText() {
        return this.months[this.invoicePeriod.month-1] +" "+ this.invoicePeriod.year;
    }

    async getInvoicePeriods(page: number){
        const service = new GetInvoicePeriods(this.token);

        this.invoicePeriodsLoading = true;
        try{
            const invoicePeriods = await service.fetch(page);
            this.invoicePeriods = this.mapInvoicePeriods(invoicePeriods);

            this.invoicePeriodsLoading = false;
            this.invoicePeriodsLoaded = true;
        }catch(ex){
            this.invoicePeriodsLoading = false;
        }
    }

    mapInvoicePeriods(invoicePeriods:any): InvoicePeriod[]{
        return (invoicePeriods && invoicePeriods.map(MainStore.mapInvoicePeriod)) || [];
    }

    static mapInvoicePeriod(invoicePeriod:any): InvoicePeriod{
        return { 
            id: invoicePeriod.id,
            month: invoicePeriod.month,
            year: invoicePeriod.year,
        };
    }

    getInvoicePeriodById(id: number){
        return this.invoicePeriods.find((invoicePeriod) => invoicePeriod.id === id);
    }

    saveInvoicePeriod(){
        const service = ( !!this.invoicePeriod.id ) ? new UpdateInvoicePeriod(this.token) : new AddInvoicePeriod(this.token);
        return service.mutate(this.invoicePeriod);
    }

    deleteInvoicePeriod(id: number){
        const service = new DeleteInvoicePeriod(this.token);
        return service.mutate(id);
    }

    setInvoicePeriodParameter(name: string, value: string){
        const val = parseInt(value,10);

        if(isNaN(val)) return;

        switch(name){
            case 'id': this.invoicePeriod.id = val; break;
            case 'month': this.invoicePeriod.month = val; break;
            case 'year':this.invoicePeriod.year = val; break;
        }
    }
    
    invoicePeriodIsValid(): boolean{
        return this.invoicePeriod.month > 0 && this.invoicePeriod.month < 13 && this.invoicePeriod.year >= 2020;
    }

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TravelOrder
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    isEmail(email: string): boolean{
        return !!email && /^([a-z0-9\-_]+\.?)+@([a-z0-9\-_]+\.)+[a-z]{2,8}$/.test(email);
    }

    invoicesLoading = false;
    invoicesLoaded = false;
    invoice: Invoice = {
        id: 0,
        period_id: this.invoicePeriod.id,
        parent_name: '',
        child_name: '',
        team: 7,
        email: '',
        address: '',
        city: '',
        price: 0,
        discount: 0,
        reference: '',
        sent: false,
    };
    invoices: Invoice[] = [];

    newInvoice(){
        this.invoice = {
            id: 0,
            period_id: this.invoicePeriod.id,
            parent_name: '',
            child_name: '',
            team: 7,
            email: '',
            address: '',
            city: '',
            price: 0,
            discount: 0,
            reference: '',
            sent: false,
        };
    }


    async getInvoices(periodId: number, page: number){
        const service = new GetInvoices(this.token);

        this.invoicesLoading = true;
        try{
            const invoices = await service.fetch(periodId, page);
            this.invoices = this.mapInvoices(invoices);
            
            this.invoicesLoading = false;
            this.invoicesLoaded = true;
        }catch(ex){
            this.invoicesLoading = false;
        }
    }

    invoiceLoading = false;
    invoiceLoaded = false;
    async loadInvoice(id: number){
        const service = new LoadInvoice(this.token);

        this.invoiceLoading = true;
        try{
            const invoice = await service.fetch(id);
            this.invoice = this.mapInvoice(invoice);

            this.invoiceLoading = false;
            this.invoiceLoaded = true;
        }catch(ex){
            this.invoiceLoading = false;
        }
    }

    mapInvoices(invoices: any): Invoice[]{
        return (invoices && invoices.map(this.mapInvoice)) || [];
    }
    
    mapInvoice(invoice: any): Invoice{
        return { 
            id: invoice.id,
            period_id: invoice.period_id,
            period: invoice.period,
            parent_name: invoice.parent_name,
            child_name: invoice.child_name,
            team: invoice.team,
            email: invoice.email,
            address: invoice.address,
            city: invoice.city,
            price: invoice.price,
            discount: invoice.discount,
            reference: invoice.reference,
            sent: invoice.sent,
            sent_date: invoice.sent_date,
        };
    }

    saveInvoice(){
        const service = ( !!this.invoice.id ) ? new UpdateInvoice(this.token) : new AddInvoice(this.token);
        return service.mutate(this.invoice);
    }

    deleteInvoice(id: number){
        const service = new DeleteInvoice(this.token);
        return service.mutate(id);
    }

    setInvoiceParameter(name: string, value: string | number | boolean){
        switch(name){
            case 'id': this.invoice.id = +value; break;
            case 'period_id': this.invoice.period_id = +value; break;
            case 'parent_name': this.invoice.parent_name = `${value}`; break;
            case 'child_name': this.invoice.child_name = `${value}`; break;
            case 'team': this.invoice.team = +value; break;
            case 'email': this.invoice.email = `${value}`; break;
            case 'address': this.invoice.address = `${value}`; break;
            case 'city': this.invoice.city = `${value}`; break;
            case 'price': this.invoice.price = +value; break;
            case 'discount': this.invoice.discount = +value; break;
            case 'reference': this.invoice.reference = `${value}`; break;
            case 'sent': this.invoice.sent = !!value; break;
        }
        
    }
    
    invoiceGetError(): {err: boolean, message: string}{
        try{
            // if( !this.travelOrder.user ) throw new Error( 'Prosimo izberite zaposlenega.');
            // if( !this.travelOrder.ordered_by ) throw new Error( 'Prosimo izberite nalogodajalca.');
            // if( !this.travelOrder.vehicle || !this.travelOrder.vehicle.length ) throw new Error( 'Prosimo vpišite vozilo.');
            // if( !this.travelOrder.distance ) throw new Error( 'Prosimo vpišite število prevoženih kilometrov.');
            // if( !this.travelOrder.price_per_km ) throw new Error( 'Prosimo vpišite ceno kilometra.');
            // if( !this.travelOrder.destination || !this.travelOrder.destination.length ) throw new Error( 'Prosimo vpišite cilj potovanja.');
            // if( !this.travelOrder.purpose_of_the_trip || !this.travelOrder.purpose_of_the_trip.length ) throw new Error( 'Prosimo vpišite namen potovanja.');

        }catch(ex){
            return {err: true, message: ex.message};
        }

        return {err: false, message: ''};
    }

    invoiceIsValid(): boolean{
        return !this.invoiceGetError().err;
    }

}

decorate(MainStore, {
    invoicePeriod: observable,
    invoicePeriods: observable,
    invoicePeriodsLoading: observable,
    invoicePeriodsLoaded: observable,
    invoice: observable,
    invoices: observable,
    invoicesLoading: observable,
    invoicesLoaded: observable,
    invoiceLoading: observable,
    invoiceLoaded: observable,
});

export const MainStoreContext = createContext(new MainStore(false));
