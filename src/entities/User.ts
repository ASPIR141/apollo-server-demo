export class User {
    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public displayName: string,
        public birthDate: string,
        public hashedPassword?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        // photo: string,
        // isVerified: boolean,
        // emailVerifyToken?: string,
        // emailVerifyTokenExpiresAt?: number
    ) { }
}