import gql from "graphql-tag";
import BaseService from './BaseService';
import { UpdateInvoicePeriodMutationMutation, UpdateInvoicePeriodMutationMutationVariables } from '../generated/graphql';
import { InvoicePeriod } from '../types/InvoicePeriod.interface';
import { navigate } from "@reach/router";

class UpdateInvoicePeriod extends BaseService<any> {
    query = gql`
    mutation UpdateInvoicePeriodMutation($id: ID!, $input: InvoicePeriodInput!) {
        updateInvoicePeriod(id: $id, input: $input){
            id
        }
    }
`;

    mutate(invoicePeriod: InvoicePeriod){
        return this.client.mutate<UpdateInvoicePeriodMutationMutation, UpdateInvoicePeriodMutationMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${invoicePeriod.id}`,
                input: {
                    month: invoicePeriod.month,
                    year: invoicePeriod.year,
                }
            },
        })
            .then(result => result?.data?.updateInvoicePeriod )
            .catch(() => navigate('/prijava'));
    }
}

export default UpdateInvoicePeriod;
