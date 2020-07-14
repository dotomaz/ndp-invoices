import gql from "graphql-tag";
import BaseService from './BaseService';
import { GetInvoicePeriodsQuery, GetInvoicePeriodsQueryVariables } from '../generated/graphql';
import { navigate } from "@reach/router";

class GetInvoicePeriods extends BaseService<any> {

    query = gql`
    query GetInvoicePeriods($page: Int!) {
        invoice_periods(first:100,  page: $page){
            data{
                id
                month
                year
            }
        }
    }
`;

    fetch(page: number){
        return this.client.query<GetInvoicePeriodsQuery, GetInvoicePeriodsQueryVariables>({ 
            // fetchPolicy: 'network-only',
            query: this.query,
            variables: { page },
        })
            .then(result => result?.data?.invoice_periods?.data)
            .catch(() => navigate('/prijava'));
    }
}

export default GetInvoicePeriods;
