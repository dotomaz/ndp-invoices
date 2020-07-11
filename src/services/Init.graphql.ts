import gql from "graphql-tag";
import BaseService from './BaseService';
import { InitQuery, InitQueryVariables } from '../generated/graphql';

class Init extends BaseService<any> {

    query = gql`
    query Init($page: Int!) {
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
        return this.client.query<InitQuery, InitQueryVariables>({ 
            // fetchPolicy: 'network-only',
            query: this.query,
            variables: { page },
        })
            .then(result => ({
                invoice_periods: result?.data?.invoice_periods?.data,
            })
            );
    }
}

export default Init;
