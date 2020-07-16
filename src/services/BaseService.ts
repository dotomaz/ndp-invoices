import ApolloClient from 'apollo-boost';
import DefaultClient from 'apollo-boost';
import { getHost } from './Host';
import {getAccessToken} from '../store/Storage'
import { navigate } from '@reach/router';

class BaseService<T> {
    client: DefaultClient<T>;
    uri = `${getHost()}/graphql`;
    // uri = 'https://localhost/graphql';

    constructor() {

        const token = getAccessToken();

        if(!token){
            navigate('/prijava');
        }

        this.client = new ApolloClient<T>({
            uri: this.uri,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
    }
}

export default BaseService;
