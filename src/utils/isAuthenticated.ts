import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
    (_parent, _args, ctx) => ctx.user !== null
);
