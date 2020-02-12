import { DeleteChannelMutationArgs, Context } from '../../graphql';
import { Channel } from '../../entities/Channel';
import { IChannelsService } from '../../services/interfaces/IChannelsService';
import { MessageDataLoader } from '../../dataloaders/MessageDataLoader';

const channelsResolver = (channelsService: IChannelsService, messageDataLoader: MessageDataLoader) => ({
    Query: {
        channels: async (_, _args, { user }: Context) => await channelsService.get(user.id)
    },
    Mutation: {
        createChannel: async (_, { input }) => await channelsService.create(input),
        deleteChannel: async (_, { id }: DeleteChannelMutationArgs) => await channelsService.delete(id),
    },
    Channel: {
        messages: async (channel: Channel) => await messageDataLoader.getMessage(channel.id)
    }
});

export default channelsResolver;