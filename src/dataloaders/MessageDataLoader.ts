import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';

import { TYPE } from '../ioc/types';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

@injectable()
export class MessageDataLoader {
    private readonly loader: DataLoader<string, Message[]> = new DataLoader(async ids => {
        const messages = await this.repository.find({ channelId: { $in: ids } });

        const messagesMap = {};
        for (const id of ids) {
            messagesMap[id] = messages.filter(message => message.channelId === id);
        }

        return ids.map(id => messagesMap[id]);
    });

    constructor(
        @inject(TYPE.MessagesRepository) private readonly repository: MessagesRepository
    ) { }

    public getMessage(id: string) {
        return this.loader.load(id);
    }

    public clearCache() {
        return this.loader.clearAll();
    }
}
