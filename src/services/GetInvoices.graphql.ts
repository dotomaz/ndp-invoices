import gql from "graphql-tag";
import BaseService from './BaseService';
import { GetInvoicesQuery, GetInvoicesVariables } from '../generated/graphql';

class GetInvoices extends BaseService<any> {

    query = gql`
    query GetInvoices(periodId: Int!, $page: Int!) {
        invoices_per_period(first:100,  page: $page){
            data{
                id
                period {
                    id
                    month
                    year
                }
                parent_name
                child_name
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
    }
`;

    fetch(page: number){
        return this.client.query<GetInvoicesQuery, GetInvoicesVariables>({ 
            // fetchPolicy: 'network-only',
            query: this.query,
            variables: { page },
        })
            .then(result => result?.data?.invoices_per_period?.data);
    }
}

export default GetInvoices;
