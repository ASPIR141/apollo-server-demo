import {
    FilterQuery,
    UpdateWriteOpResult,
    DeleteWriteOpResultObject
} from 'mongodb';

export interface IBaseRepository<T> {
    aggregate(pipeline: object[]): Promise<T[]>;
    find(query?: FilterQuery<any>, projection?: object): Promise<T[]>;
    findOne(query: FilterQuery<any>): Promise<T>;
    insertOne(object: T): Promise<any>;
    updateOne(query: FilterQuery<any>, update: object): Promise<UpdateWriteOpResult>;
    deleteOne(query: FilterQuery<any>): Promise<DeleteWriteOpResultObject>;
    deleteMany(query: FilterQuery<any>): Promise<DeleteWriteOpResultObject>;
    upsertOne(query: FilterQuery<any>, update: object): Promise<UpdateWriteOpResult>;
    updateOne(query: FilterQuery<any>, update: object): Promise<UpdateWriteOpResult>;
    updateMany(query: FilterQuery<any>, update: object): Promise<UpdateWriteOpResult>;
    count(query?: FilterQuery<any>): Promise<number>;
}