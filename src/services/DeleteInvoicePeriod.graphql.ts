import gql from "graphql-tag";
import BaseService from './BaseService';
import { DeleteInvoicePeriodMutationMutation, DeleteInvoicePeriodMutationMutationVariables } from '../generated/graphql';
import { navigate } from "@reach/router";

class DeleteInvoicePeriod extends BaseService<any> {
    query = gql`
    mutation DeleteInvoicePeriodMutation($id: ID!) {
        deleteInvoicePeriod(id: $id){
            id
        }
    }
`;

    mutate(id: number){
        return this.client.mutate<DeleteInvoicePeriodMutationMutation, DeleteInvoicePeriodMutationMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${id}`,
            },
        })
            .then(result => result?.data?.deleteInvoicePeriod)
            .catch(() => navigate('/prijava'));
    }
}

export default DeleteInvoicePeriod;
