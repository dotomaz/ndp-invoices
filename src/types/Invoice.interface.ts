import { InvoicePeriod } from './InvoicePeriod.interface';

export interface Invoice {
    id: number;
    period_id: number;
    period?: InvoicePeriod;
    parent_name: string;
    child_name: string;
    team: number;
    email: string;
    address: string;
    city: string;
    price: number;
    discount: number;
    reference: string;
    should_send: boolean;
    sent: boolean;
    sent_date?: string 
};
