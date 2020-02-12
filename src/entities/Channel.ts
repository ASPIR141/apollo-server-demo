import { Message } from './Message';

export class Channel {
    constructor(
        public id: string,
        public displayName: string,
        public description: string,
        public members: string[]
    ) { }
}