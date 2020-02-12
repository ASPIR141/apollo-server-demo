import { inject, injectable } from 'inversify';

import { generateUuid } from '../utils/uuid';
import { exception } from '../decorators/exceptionDecorator';
import { CreateMessageMutationArgs } from '../graphql';
import { IMessagesService } from './interfaces/IMessagesService';
import { TYPE } from '../ioc/types';
import { MessagesRepository } from '../repositories/MessagesRepository';
import { Message } from '../entities/Message';

@injectable()
export class MessagesService implements IMessagesService {
    constructor(
        @inject(TYPE.MessagesRepository) private readonly repository: MessagesRepository
    ) { }

    @exception()
    public get(channelId: string) {
        return this.repository.find({ channelId });
    }

    @exception()
    public create(input: CreateMessageMutationArgs) {
        const id = generateUuid();
        const message = new Message(
            id,
            input.text,
            input.sender,
            input.channelId,
            input.createTime
        );

        return this.repository.insertOne(message);
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