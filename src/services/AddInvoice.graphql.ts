import gql from "graphql-tag";
import BaseService from './BaseService';
import { CreateInvoiceMutation, CreateInvoiceMutationVariables } from '../generated/graphql';
import { Invoice } from '../types/Invoice.interface';
import { navigate } from "@reach/router";

class AddInvoice extends BaseService<any> {
    query = gql`
    mutation CreateInvoice($input: InvoiceInput!){
        createInvoice(input: $input){
            id
        }
    }
`;

    mutate(invoice: Invoice){
        return this.client.mutate<CreateInvoiceMutation, CreateInvoiceMutationVariables>({ 
            mutation: this.query,
            variables: { 
                input: {
                    period_id: invoice.period_id,
                    parent_name: invoice.parent_name,
                    child_name: invoice.child_name,
                    team: invoice.team,
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
            .then(result => result?.data?.createInvoice)
            .catch(() => navigate('/prijava'));
    }
}

export default AddInvoice;
