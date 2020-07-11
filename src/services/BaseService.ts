import ApolloClient from 'apollo-boost';
import DefaultClient from 'apollo-boost';

class BaseService<T> {
    client: DefaultClient<T>;
    uri = 'http://localhost/graphql';

    constructor(token: string) {
        this.client = new ApolloClient<T>({
            uri: this.uri,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
    }
}

export default BaseService;
