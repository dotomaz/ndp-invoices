import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';
import { format } from 'date-fns';

import AddUser from '../services/AddUser.graphql';
import AddTravelOrder from '../services/AddTravelOrder.graphql';
import DeleteUser from '../services/DeleteUser.graphql';
import DeleteTravelOrder from '../services/DeleteTravelOrder.graphql';
import UpdateUser from '../services/UpdateUser.graphql';
import UpdateTravelOrder from '../services/UpdateTravelOrder.graphql';
import GetTravelOrders from '../services/GetTravelOrders.graphql';
import GetUsers from '../services/GetUsers.graphql';
import InitService from '../services/Init.graphql';
import LoadTravelOrder from '../services/LoadTravelOrder.graphql';
import { User } from '../types/User.interface';
import { TravelOrder } from '../types/TravelOrder.interface';
import { OrderType, User as UserGQL, TravelOrder as TravelOrderGQL } from '../generated/graphql';


const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0);
const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0);

export class MainStore {
    company = {
        title: 'Nogometno društvo Polzela',
        address: 'Polzela 126',
        postalCode: 3313,
        city: 'Polzela',
        taxNumber: '90383524',
        accountNumber: 'SI56 0600 0010 0088 003',
    }
    usersLoading = false;
    usersLoaded = false;
    user: User = {
        id: '',
        name: '',
        email: '',
    };

    users: User[] = [];

    constructor(loadUsers: boolean = true){
        if(loadUsers){
            this.Init();
        }

        this.newUser();
        this.newTravelOrder();
    }

    async Init(){
        const service = new InitService("");

        this.travelOrdersLoading = true;
        try{
            const {users, travelOrders} = await service.fetch(1);
            this.users = this.mapUsers(users);
            this.travelOrders = this.mapTravelOrders(travelOrders);
            
            this.travelOrdersLoading = false;
            this.travelOrdersLoaded = true;
        }catch(ex){
            this.travelOrdersLoading = false;
        }
    }

    newUser(){
        this.user = {
            id: '',
            name: '',
            email: '',
        };
    }

    async getUsers(page: number){
        const service = new GetUsers("");

        this.usersLoading = true;
        try{
            const users = await service.fetch(page);
            this.users = this.mapUsers(users);

            this.usersLoading = false;
            this.usersLoaded = true;
        }catch(ex){
            this.usersLoading = false;
        }
    }

    mapUsers(users:any): User[]{
        return (users && users.map(MainStore.mapUser)) || [];
    }

    static mapUser(user:any): User{
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address || '',
            postalCode: user.postal_code || '',
            city: user.city || '',
            phone: user.phone || '',
            enabled: !!user.enabled,
            pricePerKm: user.price_per_km || 0,
            trr: user.trr || '',
        };
    }

    getUserById(id: string){
        return this.users.find((user) => user.id === id);
    }

    get usersSelectValues(): {id: string, value: string}[]{
        return [{id: '', value: '-- izberite uporabnika --'}, ...this.users.map((user) => ({id: user.id, value: user.name}))];
    }

    saveUser(){
        const service = ( !!this.user.id ) ? new UpdateUser("") : new AddUser("");
        return service.mutate(this.user);
    }

    deleteUser(id: string){
        const service = new DeleteUser("");
        return service.mutate(id);
    }

    setUserParameter(name: string, value: string){
        switch(name){
            case 'id': this.user.id = value; break;
            case 'name': this.user.name = value; break;
            case 'address':this.user.address = value; break;
            case 'postalCode': this.user.postalCode = value; break;
            case 'city': this.user.city = value; break;
            case 'email': this.user.email = value; break;
            case 'phone': this.user.phone = value; break;
            case 'trr': this.user.trr = value; break;
            case 'enabled': this.user.enabled = !!value; break;
            case 'pricePerKm': this.user.pricePerKm = parseFloat(value); break;
        }
    }
    
    userIsValid(): boolean{
        return !!this.user.name && this.isEmail(this.user.email);
    }

    isEmail(email: string): boolean{
        return !!this.user.email && /^([a-z0-9\-_]+\.?)+@([a-z0-9\-_]+\.)+[a-z]{2,8}$/.test(email);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TravelOrder
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    travelOrdersLoading = false;
    travelOrdersLoaded = false;
    travelOrder: TravelOrder = {
        id: '',
        start_date: format(todayStart, 'YYYY-MM-DD HH:mm:ss'),
        end_date: format(todayEnd, 'YYYY-MM-DD HH:mm:ss'),
        per_diem_amount: 21.39,
        price_per_km: 0.37,
        distance: 0,
        per_diem: true,
        order_type: 'PERSONAL' as OrderType,
    };
    travelOrders: TravelOrder[] = [];

    newTravelOrder(){
        this.travelOrder = {
            id: '',
            start_date: format(todayStart, 'YYYY-MM-DD HH:mm:ss'),
            end_date: format(todayEnd, 'YYYY-MM-DD HH:mm:ss'),
            per_diem_amount: 21.39,
            price_per_km: 0.37,
            distance: 0,
            per_diem: true,
            order_type: 'PERSONAL' as OrderType,
        };
    }


    async getTravelOrders(page: number){
        const service = new GetTravelOrders("");

        this.travelOrdersLoading = true;
        try{
            const travelOrders = await service.fetch(page);
            this.travelOrders = this.mapTravelOrders(travelOrders);
            
            this.travelOrdersLoading = false;
            this.travelOrdersLoaded = true;
        }catch(ex){
            this.travelOrdersLoading = false;
        }
    }

    travelOrderLoading = false;
    travelOrderLoaded = false;
    async loadTravelOrder(id: string){
        const service = new LoadTravelOrder("");

        this.travelOrderLoading = true;
        try{
            const travelOrder = await service.fetch(id);
            this.travelOrder = this.mapTravelOrder(travelOrder);

            this.travelOrderLoading = false;
            this.travelOrderLoaded = true;
        }catch(ex){
            this.travelOrderLoading = false;
        }
    }

    mapTravelOrders(travelOrders: any): TravelOrder[]{
        return (travelOrders && travelOrders.map(this.mapTravelOrder)) || [];
    }
    
    mapTravelOrder(travelOrder: any): TravelOrder{
        return { 
            id: travelOrder.id,
            number: travelOrder.number || '',
            start_date: travelOrder.start_date,
            end_date: travelOrder.end_date,
            per_diem: travelOrder.per_diem === 1,
            per_diem_amount: travelOrder.per_diem_amount || 0,
            user: MainStore.mapUser((travelOrder.user) || ''),
            ordered_by: MainStore.mapUser((travelOrder.ordered_by) || ''),
            order_type: travelOrder.order_type || OrderType.Personal,
            vehicle: travelOrder.vehicle || '',
            distance: travelOrder.distance || 0,
            price_per_km: travelOrder.price_per_km || 0,
            destination: travelOrder.destination || '',
            purpose_of_the_trip: travelOrder.purpose_of_the_trip || '',
            description: travelOrder.description || '',
            report: travelOrder.report || '',
        };
    }

    get travelOrderAmmount() : number{
        const value = ((this.travelOrder.distance || 0) * (this.travelOrder.price_per_km || 0 )) + 
            (this.travelOrder.per_diem ? (this.travelOrder.per_diem_amount || 0) : 0);
        return Math.round(value*100)/100;
    }

    get travelOrderDuration() : number{
        const start = (new Date(this.travelOrder.start_date)).getTime();
        const end = (new Date(this.travelOrder.end_date)).getTime();
        const value = (end - start) / (1000 * 60 * 60);
        return Math.round(value);
    }

    saveTravelOrder(){
        const service = ( !!this.travelOrder.id ) ? new UpdateTravelOrder("") : new AddTravelOrder("");
        return service.mutate(this.travelOrder);
    }

    duplicateTravelOrder(originalTravelOrder: TravelOrder){
        const travelOrder: TravelOrder = { ...originalTravelOrder, id: ''};
        const service = new AddTravelOrder("");
        return service.mutate(travelOrder);
    }

    deleteTravelOrder(id: string){
        const service = new DeleteTravelOrder("");
        return service.mutate(id);
    }

    setTravelOrderParameter(name: string, value: string){
        switch(name){
            case 'id': this.travelOrder.id = value; break;
            case 'start_date': this.travelOrder.start_date = value; break;
            case 'end_date':this.travelOrder.end_date = value; break;
            case 'per_diem': this.travelOrder.per_diem = value==='1'; break;
            case 'per_diem_amount': this.travelOrder.per_diem_amount = parseFloat(value.replace(/,/, '.')); break;
            case 'user': this.travelOrder.user = this.getUserById(value); break;
            case 'ordered_by': this.travelOrder.ordered_by = this.getUserById(value); break;
            case 'order_type': this.travelOrder.order_type = value as OrderType; break;
            case 'vehicle': this.travelOrder.vehicle = value; break;
            case 'distance': this.travelOrder.distance = parseInt(value, 10); break;
            case 'price_per_km': this.travelOrder.price_per_km = parseFloat(value.replace(/,/, '.')); break;
            case 'destination': this.travelOrder.destination = value; break;
            case 'purpose_of_the_trip': this.travelOrder.purpose_of_the_trip = value; break;
            case 'description': this.travelOrder.description = value; break;
            case 'report': this.travelOrder.report = value; break;
        }
        
    }
    
    travelOrderGetError(): {err: boolean, message: string}{
        try{
            if( !this.travelOrder.user ) throw new Error( 'Prosimo izberite zaposlenega.');
            if( !this.travelOrder.ordered_by ) throw new Error( 'Prosimo izberite nalogodajalca.');
            if( !this.travelOrder.vehicle || !this.travelOrder.vehicle.length ) throw new Error( 'Prosimo vpišite vozilo.');
            if( !this.travelOrder.distance ) throw new Error( 'Prosimo vpišite število prevoženih kilometrov.');
            if( !this.travelOrder.price_per_km ) throw new Error( 'Prosimo vpišite ceno kilometra.');
            if( !this.travelOrder.destination || !this.travelOrder.destination.length ) throw new Error( 'Prosimo vpišite cilj potovanja.');
            if( !this.travelOrder.purpose_of_the_trip || !this.travelOrder.purpose_of_the_trip.length ) throw new Error( 'Prosimo vpišite namen potovanja.');

        }catch(ex){
            return {err: true, message: ex.message};
        }

        return {err: false, message: ''};
    }

    travelOrderIsValid(): boolean{
        return !this.travelOrderGetError().err;
    }

    get orderTypeSelectValues(): {id: string, value: string}[]{
        return [
            { id: "PERSONAL", value: 'Osebno'},
            { id: "PHONE", value: 'Telefon'},
            { id: "MOBILE", value: 'GSM'},
            { id: "FAX", value: 'Fax'},
            { id: "EMAIL", value: 'E-mail'}
        ];
    }
}

decorate(MainStore, {
    user: observable,
    users: observable,
    usersLoading: observable,
    usersLoaded: observable,
    usersSelectValues: computed,
    travelOrder: observable,
    travelOrders: observable,
    travelOrdersLoading: observable,
    travelOrdersLoaded: observable,
    travelOrderLoading: observable,
    travelOrderLoaded: observable,
    travelOrderAmmount: computed,
    travelOrderDuration: computed,
});

export const MainStoreContext = createContext(new MainStore(false));
