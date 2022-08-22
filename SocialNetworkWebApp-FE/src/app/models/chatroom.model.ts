import { Message } from "./message.model";
import { User } from "./user.model";

export class Chatroom {
    id: string = '';
    chatroomName: string = '';

    chatMembers: User[] = [];
    messages: Message[] = [];
}