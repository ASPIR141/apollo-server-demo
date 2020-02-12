import { inject } from 'inversify';
import DataLoader from 'dataloader';

import { TYPE } from '../ioc/types';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';


export class UserDataLoader {
    private readonly loader: DataLoader<string, User> = new DataLoader(async ids => {
        const users = await this.repository.find({ id: { $in: ids } });
        return ids.map(
            id => users.find(user => user.id === id)
        );
    });

    constructor(
        @inject(TYPE.UsersRepository) private readonly repository: UsersRepository
    ) { }

    public getUser(id: string) {
        return this.loader.load(id);
    }
}
