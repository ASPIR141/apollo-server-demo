import { Db } from 'mongodb';

import { BaseRepository } from './BaseRepository';
import { User } from '../entities/User';

export class UsersRepository extends BaseRepository<User> {
    constructor(
        protected readonly db: Db,
        protected readonly collectionName: string
    ) {
        super(db, collectionName);
    }
}
