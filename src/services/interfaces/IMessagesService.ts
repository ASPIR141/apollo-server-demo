import { CreateMessageMutationArgs } from '../../graphql';
import { Message } from '../../entities/Message';

export interface IMessagesService {
    get(channelId: string): Promise<Message[]>;
    create(input: CreateMessageMutationArgs): Promise<any>;
    delete(id: string): Promise<{ ok: boolean; error?: string; }>;
}