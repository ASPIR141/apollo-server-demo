import { fluentProvide } from 'inversify-binding-decorators';

import { TYPE } from '../ioc/types';
import { MongoDBProvider } from '../providers/mongo/MongoDBProvider';

@fluentProvide(TYPE.MongoDBProviderFactory).inSingletonScope().done()
export class MongoDBProviderFactory {
    public create() {
        const options = {
            uri: process.env.MONGODB_CONNECTION_URI,
            databaseName: process.env.MONGODB_DATABASE
        };

        const provider = new MongoDBProvider(options);
        return provider.getConnection();
    }
}
