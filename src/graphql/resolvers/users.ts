import { Context, SignInMutationArgs } from '../../graphql';
import { IUsersService } from '../../services/interfaces/IUsersService';

const usersResolver = (usersService: IUsersService) => ({
    Query: {
        user: async (_, _args, { user }: Context) => await usersService.get(user.id)
    },
    Mutation: {
        signIn: async (_, { email, password }: SignInMutationArgs) => await usersService.signIn(email, password),
        createUser: async(_, { input }) => await usersService.create(input),
        deleteUser: async(_, _args, { user }: Context) => await usersService.delete(user.id)
    }
});

export default usersResolver;