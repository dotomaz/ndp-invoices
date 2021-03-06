import gql from "graphql-tag";
import BaseService from './BaseService';
import { LoadInvoiceQuery, LoadInvoiceQueryVariables } from '../generated/graphql';

class GetUsers extends BaseService<any> {

    query = gql`
    query LoadInvoice($id: ID!) {
        invoice(id: $id) {
            id
            period {
                id
                month
                year
            }
            parent_name
            child_name
            team
            email
            address
            city
            price
            discount
            reference
            sent
            sent_date
        }
    }
`;

    fetch(id: number){
        return this.client.query<LoadInvoiceQuery, LoadInvoiceQueryVariables>({ 
            // fetchPolicy: 'network-only',
            query: this.query,
            variables: { id: `${id}` },
        })
            .then(result => result?.data?.invoice);
    }
}

export default GetUsers;
