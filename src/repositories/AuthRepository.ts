import { Db } from 'mongodb';

import { BaseRepository } from './BaseRepository';
import { Token } from '../entities/Token';

export class AuthRepository extends BaseRepository<Token> {
    constructor(
        protected readonly db: Db,
        protected readonly collectionName: string
    ) {
        super(db, collectionName);
    }
}