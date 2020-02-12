export class Token {
    constructor(
        public clientId: string,
        public accessToken: string,
        public refreshToken: string
    ) { }
}