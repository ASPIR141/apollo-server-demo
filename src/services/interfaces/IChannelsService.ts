import { CreateChannelMutationArgs } from '../../graphql';
import { Channel } from '../../entities/Channel';

export interface IChannelsService {
    get(userId: string): Promise<Channel[]>;
    create(input: CreateChannelMutationArgs): Promise<any>;
    delete(id: string): Promise<{ ok: boolean; error?: string; }>;
}