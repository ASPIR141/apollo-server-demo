import { Db } from 'mongodb';

import { BaseRepository } from './BaseRepository';
import { Channel } from '../entities/Channel';

export class ChannelsRepository extends BaseRepository<Channel> {
    constructor(
        protected readonly db: Db,
        protected readonly collectionName: string
    ) {
        super(db, collectionName);
    }
}