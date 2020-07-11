import gql from "graphql-tag";
import BaseService from './BaseService';
import { UpdateInvoiceMutation, UpdateInvoiceMutationVariables } from '../generated/graphql';
import { Invoice } from '../types/Invoice.interface';

class UpdateInvoice extends BaseService<any> {
    query = gql`
    mutation UpdateInvoice($id: ID!, $input: InvoiceInput!){
        updateInvoice(id: $id, input: $input){
            id
        }
    }
`;

    mutate(invoice: Invoice){
        return this.client.mutate<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${invoice.id}`,
                input: {
                    period_id: invoice.period_id,
                    parent_name: invoice.parent_name,
                    child_name: invoice.child_name,
                    email: invoice.child_name,
                    address: invoice.address,
                    city: invoice.city,
                    price: invoice.price,
                    discount: invoice.discount,
                    reference: invoice.reference,
                    sent: invoice.sent ? 1 : 0,
                    sent_date: invoice.sent_date, 
                }
            },
        })
            .then(result => result?.data?.updateInvoice );
    }
}

export default UpdateInvoice;
