import gql from "graphql-tag";
import BaseService from './BaseService';
import { CreateInvoicePeriodMutation, CreateInvoicePeriodMutationVariables } from '../generated/graphql';
import { InvoicePeriod } from '../types/InvoicePeriod.interface';

class AddInvoicePeriod extends BaseService<any> {
    query = gql`
    mutation CreateInvoicePeriod($input: InvoicePeriodInput!) {
        createInvoicePeriod(input: $input){
            id
        }
    }
`;

    mutate(invoicePeriod: InvoicePeriod){
        return this.client.mutate<CreateInvoicePeriodMutation, CreateInvoicePeriodMutationVariables>({ 
            mutation: this.query,
            variables: { 
                input: {
                    month: invoicePeriod.month,
                    year: invoicePeriod.year,
                }
            },
        })
            .then(result => result?.data?.createInvoicePeriod);
    }
}

export default AddInvoicePeriod;
