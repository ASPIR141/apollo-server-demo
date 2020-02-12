import { Db } from 'mongodb';

import { BaseRepository } from './BaseRepository';
import { Message } from '../entities/Message';

export class MessagesRepository extends BaseRepository<Message> {
    constructor(
        protected readonly db: Db,
        protected readonly collectionName: string
    ) {
        super(db, collectionName);
    }
}