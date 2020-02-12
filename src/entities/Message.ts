export class Message {
    constructor(
        public id: string,
        public text: string,
        public sender: string,
        public channelId: string,
        public createTime: string
    ) { }
}