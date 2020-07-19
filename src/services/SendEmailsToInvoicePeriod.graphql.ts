import gql from "graphql-tag";
import BaseService from './BaseService';
import { SendEmailsToInvoicePeriodMutation, SendEmailsToInvoicePeriodMutationVariables } from '../generated/graphql';
import { Invoice } from '../types/Invoice.interface';

class SendEmailsToInvoicePeriod extends BaseService<any> {
    query = gql`
    mutation SendEmailsToInvoicePeriod($id: ID!){
        sendEmailsToInvoicePeriod(id: $id){
            success
            message
        }
    }
`;

    mutate(periodId: number){
        return this.client.mutate<SendEmailsToInvoicePeriodMutation, SendEmailsToInvoicePeriodMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${periodId}`,
            },
        })
            .then(result => result?.data?.sendEmailsToInvoicePeriod );
    }
}

export default SendEmailsToInvoicePeriod;
