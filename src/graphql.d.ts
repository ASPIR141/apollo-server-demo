export interface Context {
    user: {
        id: string;
    };
}

export interface CreateMessageMutationArgs {
    sender: string;
    text: string;
    channelId: string;
    createTime: string;
}

export interface DeleteMessageMutationArgs {
    id: string;
}

export interface CreateChannelMutationArgs {
    displayName: string;
    description: string;
    members: string[];
}

export interface DeleteChannelMutationArgs {
    id: string;
}

export interface CreateUserMutationArgs {
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    birthDate: string;
    password: string;
}

export interface SignInMutationArgs {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    userId: string;
}