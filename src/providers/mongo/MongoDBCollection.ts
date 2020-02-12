import {
    Collection,
    FilterQuery,
    UpdateWriteOpResult,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult
} from 'mongodb';

export class MongoCollection {
    private mongoCollection: Collection;

    constructor(mongoCollection: Collection) {
        this.mongoCollection = mongoCollection;
    }

    public async find<T>(
        query: FilterQuery<any>,
        { skip, limit, sort }: { skip?: number; limit?: number, sort?: any[] | object } = {}
    ): Promise<T[]> {
        return await this.mongoCollection
            .find<T>(query, {
                skip,
                limit,
                sort
            })
            .toArray();
    }

    public async findOne<T>(query: FilterQuery<any>): Promise<T> {
        return await this.mongoCollection.findOne<T>(query);
    }

    public count(
        query: FilterQuery<any>,
        { skip, limit }: { skip?: number; limit?: number } = {}
    ): Promise<number> {
        return this.mongoCollection.countDocuments(query, {
            skip,
            limit
        });
    }

    public insertOne<T>(docs: T): Promise<InsertOneWriteOpResult<any>> {
        return this.mongoCollection.insertOne(docs);
    }

    public updateOne(query: FilterQuery<any>, update: any): Promise<UpdateWriteOpResult> {
        return this.mongoCollection.updateOne(query, update);
    }

    public upsertOne(query: FilterQuery<any>, update: any): Promise<UpdateWriteOpResult> {
        return this.mongoCollection.updateOne(query, update, { upsert: true });
    }

    public updateMany(query: FilterQuery<any>, update: any): Promise<UpdateWriteOpResult> {
        return this.mongoCollection.updateMany(query, update);
    }

    public deleteOne(query: FilterQuery<any>): Promise<DeleteWriteOpResultObject> {
        return this.mongoCollection.deleteOne(query);
    }

    public deleteMany(query: FilterQuery<any>): Promise<DeleteWriteOpResultObject> {
        return this.mongoCollection.deleteMany(query);
    }

    public async aggregate<T>(pipeline: object[]): Promise<T[]> {
        return await this.mongoCollection
            .aggregate(pipeline)
            .toArray();
    }

    public drop(): Promise<any> {
        return this.mongoCollection.drop();
    }

    public createIndexTTL(field: any, expireAfterSeconds: number) {
        return this.mongoCollection.createIndex(field, { expireAfterSeconds });
    }
}
