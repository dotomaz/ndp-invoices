import gql from "graphql-tag";
import BaseService from './BaseService';
import { DeleteInvoiceMutationMutation, DeleteInvoiceMutationMutationVariables } from '../generated/graphql';
import { navigate } from "@reach/router";

class DeleteInvoice extends BaseService<any> {
    query = gql`
    mutation DeleteInvoiceMutation($id: ID!) {
        deleteInvoice(id: $id){
            id
        }
    }
`;

    mutate(id: number){
        return this.client.mutate<DeleteInvoiceMutationMutation, DeleteInvoiceMutationMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: `${id}`,
            },
        })
            .then(result => result?.data?.deleteInvoice)
            .catch(() => navigate('/prijava'));
    }
}

export default DeleteInvoice
