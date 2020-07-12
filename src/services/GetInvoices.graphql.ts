import gql from "graphql-tag";
import BaseService from './BaseService';
import { GetInvoicesQuery, GetInvoicesQueryVariables } from '../generated/graphql';

class GetInvoices extends BaseService<any> {

    query = gql`
    query GetInvoices($periodId: Int!, $page: Int!) {
        invoices_per_period(period_id: $periodId, first:100,  page: $page){
            data{
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
    }
`;

    fetch(periodId: number, page: number){
        return this.client.query<GetInvoicesQuery, GetInvoicesQueryVariables>({ 
            // fetchPolicy: 'network-only',
            query: this.query,
            variables: { periodId, page },
        })
            .then(result => result?.data?.invoices_per_period?.data);
    }
}

export default GetInvoices;
