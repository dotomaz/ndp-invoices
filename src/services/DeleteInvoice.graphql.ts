import gql from "graphql-tag";
import BaseService from './BaseService';
import { DeleteInvoiceMutationMutation, DeleteInvoiceMutationMutationVariables } from '../generated/graphql';

class DeleteInvoice extends BaseService<any> {
    query = gql`
    mutation DeleteInvoiceMutation($id: ID!) {
        deleteInvoice(id: $id){
            id
        }
    }
`;

    mutate(id: string){
        return this.client.mutate<DeleteInvoiceMutationMutation, DeleteInvoiceMutationMutationVariables>({ 
            mutation: this.query,
            variables: { 
                id: id,
            },
        })
            .then(result => result?.data?.deleteUser);
    }
}

export default DeleteInvoice
