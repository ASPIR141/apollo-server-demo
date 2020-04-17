import * as bcrypt from 'bcrypt';

const hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

const compare = (password: string, hashedPassword: string): Promise<boolean> => {
    if (!password || !hashedPassword) {
        return Promise.resolve(false);
    }

    return bcrypt.compare(password, hashedPassword);
};

export { hash, compare };
