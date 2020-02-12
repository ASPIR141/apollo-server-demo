import { inject, injectable } from 'inversify';
import { AuthenticationError } from 'apollo-server';

import { TYPE } from '../ioc/types';
import { User } from '../entities/User';
import { hash, compare } from '../utils/password';
import { AuthUtil } from '../utils/auth';
import { generateUuid } from '../utils/uuid';
import { exception } from '../decorators/exceptionDecorator';
import { IUsersService } from './interfaces/IUsersService';
import { AuthRepository } from '../repositories/AuthRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserMutationArgs } from '../graphql';
import { Token } from '../entities/Token';

@injectable()
export class UsersService implements IUsersService {
    constructor(
        @inject(TYPE.AuthRepository) private readonly authRepository: AuthRepository,
        @inject(TYPE.UsersRepository) private readonly repository: UsersRepository
    ) { }

    @exception()
    public get(id: string) {
        return this.repository.findOne({ id });
    }

    @exception()
    public async create(input: CreateUserMutationArgs) {
        const existingUser = await this.repository.findOne({ email: input.email });
        if (existingUser) {
            return new AuthenticationError('User with this email already exists');
        }

        const id = generateUuid();
        const hashedPassword = await hash(input.password);
        const { access_token, refresh_token } = AuthUtil.generateToken({ email: input.email, id });
        const user = new User(
            id,
            input.email,
            input.firstName,
            input.lastName,
            input.displayName,
            input.birthDate,
            hashedPassword,
            new Date()
        );

        const token = new Token(
            id,
            access_token,
            refresh_token
        );

        await Promise.all([
            this.repository.insertOne(user),
            this.authRepository.insertOne(token)
        ]);

        return { userId: id, access_token, refresh_token };
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

    @exception()
    public async signIn(email: string, password: string) {
        const user = await this.repository.findOne({ email });
        if (!user) {
            return new AuthenticationError('User with this email does not exist');
        }

        const isValidPassword = await compare(password, user.hashedPassword);
        if (!isValidPassword) {
            return new AuthenticationError('Invalid password');
        }

        const { access_token, refresh_token } = AuthUtil.generateToken({ email, id: user.id });

        await this.authRepository.updateOne(
            { clientId: user.id },
            {
                $set: { clientId: user.id, access_token, refresh_token }
            }
        );

        return { userId: user.id, access_token, refresh_token };
    }
}