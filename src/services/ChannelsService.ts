import { inject, injectable } from 'inversify';

import { CreateChannelMutationArgs } from '../graphql';
import { exception } from '../decorators/exceptionDecorator';
import { generateUuid } from '../utils/uuid';
import { IChannelsService } from './interfaces/IChannelsService';
import { ChannelsRepository } from '../repositories/ChannelsRepository';
import { TYPE } from '../ioc/types';
import { Channel } from '../entities/Channel';

@injectable()
export class ChannelsService implements IChannelsService {
    constructor(
        @inject(TYPE.ChannelsRepository) private readonly repository: ChannelsRepository
    ) { }

    @exception()
    public get(userId: string) {
        return this.repository.find(
            { members: { $elemMatch: { $eq: userId } } }
        );
    }

    @exception()
    public create(input: CreateChannelMutationArgs) {
        const id = generateUuid();
        const channel = new Channel(
            id,
            input.displayName,
            input.description,
            input.members
        );

        return this.repository.insertOne(channel);
    }

    @exception()
    public async delete(id: string) {
        try {
            const { result } = await this.repository.deleteOne({ id });
            return { ok: Boolean(result.ok), error: null };
        } catch (error) {
            return {
                ok: false,
                error: error.message
            };
        }
    }
}