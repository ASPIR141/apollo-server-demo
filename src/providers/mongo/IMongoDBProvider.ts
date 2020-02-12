import { Db } from 'mongodb';

export interface IMongoDBProvider {
    getConnection(): Promise<Db>;
    close(): Promise<void>;
}

