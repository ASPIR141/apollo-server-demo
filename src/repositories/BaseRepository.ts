import { FilterQuery, Db } from 'mongodb';

import { MongoCollection } from '../providers/mongo/MongoDBCollection';
import { IBaseRepository } from './IBaseRepository';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    private readonly collection: MongoCollection;

    constructor(
        protected readonly db: Db,
        protected readonly collectionName: string
    ) {
        const collection = db.collection(collectionName);
        this.collection = new MongoCollection(collection);
    }

    public aggregate(pipeline: object[]) {
        return this.collection.aggregate<T>(pipeline);
    }

    /**
     * (node:32755) DeprecationWarning:
     * collection.count is deprecated, and will be removed in a future version.
     * Use Collection.countDocuments or Collection.estimatedDocumentCount instead
     */
    public count(query?: FilterQuery<any>) {
        return this.collection.count(query);
    }

    public find(query?: FilterQuery<any>, projection?: object) {
        return this.collection.find<T>(query, projection);
    }

    public findOne(query: FilterQuery<any>) {
        return this.collection.findOne<T>(query);
    }

    public async insertOne(object: T) {
        const { insertedId, ops } = await this.collection.insertOne<T>(object);
        return ops[0];
    }

    public updateOne(query: FilterQuery<any>, update: object) {
        return this.collection.updateOne(query, update);
    }

    public updateMany(query: FilterQuery<any>, update: object) {
        return this.collection.updateMany(query, update);
    }

    public deleteOne(query: FilterQuery<any>) {
        return this.collection.deleteOne(query);
    }

    public deleteMany(query: FilterQuery<any>) {
        return this.collection.deleteMany(query);
    }

    public upsertOne(query: FilterQuery<any>, update: object) {
        return this.collection.upsertOne(query, update);
    }

    public createIndexTTL(field: any, expireAfterSeconds: number) {
        return this.collection.createIndexTTL(field, expireAfterSeconds);
    }
}