import gql from "graphql-tag";
import BaseService from './BaseService';
import { SendEmailToInvoiceMutation, SendEmailToInvoiceMutationVariables } from '../generated/graphql';
import { Invoice } from '../types/Invoice.interface';

class SendInvoiceEmail extends BaseService<any> {
    query = gql`
    mutation SendEmailToInvoice($id: ID!){
        sendEmailToInvoice(id: $id){
            success
            message
        }
    }
`;

    mutate(invoice: Invoice){
        return this.client.mutate<SendEmailToInvoiceMutation, SendEmailToInvoiceMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${invoice.id}`,
            },
        })
            .then(result => result?.data?.sendEmailToInvoice );
    }
}

export default SendInvoiceEmail;
