import { AuthenticationError } from 'apollo-server';
import { CreateUserMutationArgs, AuthResponse } from '../../graphql';
import { User } from '../../entities/User';

export interface IUsersService {
    get(id: string): Promise<User>;
    create(input: CreateUserMutationArgs): Promise<AuthResponse | AuthenticationError>;
    delete(id: string): Promise<{ ok: boolean; error?: string; }>;
    signIn(email: string, password: string): Promise<AuthResponse | AuthenticationError>;
}