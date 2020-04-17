import { MongoClient, Db } from 'mongodb';

import { IMongoDBProvider } from './IMongoDBProvider';

export class MongoDBProvider implements IMongoDBProvider {
    private client: MongoClient;
    private database: Db;
    private databaseName: string;
    private mongoOptions: any;
    private uri: string;

    constructor({
        uri,
        databaseName,
        mongoOptions = {}
    }: { uri: string; databaseName?: string; mongoOptions?: any }) {
        this.uri = uri;
        this.databaseName = databaseName;
        this.mongoOptions = mongoOptions;
    }

    private async connect() {
        this.client = await MongoClient.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.database = this.client.db(this.databaseName);
        return this.database;
    }

    private isConnected(): boolean {
        return this.client && this.client.isConnected();
    }

    public async getConnection() {
        if (this.isConnected()) {
            return this.database;
        }

        return this.connect();
    }

    public async close() {
        if (this.isConnected()) {
            await this.client.close();
        }
    }
}
