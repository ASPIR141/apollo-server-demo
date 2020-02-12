import * as bcrypt from 'bcrypt';

const hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
    if (!password || !hashedPassword) {
        return Promise.resolve(false);
    }

    return await bcrypt.compare(password, hashedPassword);
};

export { hash, compare };
