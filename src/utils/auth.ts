import * as jwt from 'jsonwebtoken';

export class AuthUtil {
    public static verifyToken(token: string) {
        try {
            if (token) {
                return jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    public static generateToken(user: any) {
        const access_token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: 3600 });
        const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        return { access_token, refresh_token };
    }
}
