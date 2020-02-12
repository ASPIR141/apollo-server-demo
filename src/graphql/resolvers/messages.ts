import { withFilter, PubSub } from 'apollo-server';

import { DeleteMessageMutationArgs } from '../../graphql';
import { IMessagesService } from '../../services/interfaces/IMessagesService';
import { MessageDataLoader } from '../../dataloaders/MessageDataLoader';

const MESSAGE_ADDED_TOPIC = 'MESSAGE_ADDED';

const pubsub = new PubSub();

const messagesResolver = (messagesService: IMessagesService, messageDataLoader: MessageDataLoader) => ({
    Query: {
        messages: async (_, { channelId }) => await messagesService.get(channelId)
    },
    Mutation: {
        createMessage: async (_, { input }) => {
            const message = await messagesService.create(input);
            pubsub.publish(MESSAGE_ADDED_TOPIC, { messageAdded: message, channelId: input.channelId });

            return message;
        },
        deleteMessage: async (_, { id }: DeleteMessageMutationArgs) => {
            const result = await messagesService.delete(id);
            messageDataLoader.clearCache();

            return result;
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
                (payload, variables) => payload.channelId === variables.channelId
            )
        }
    }
});

export default messagesResolver;