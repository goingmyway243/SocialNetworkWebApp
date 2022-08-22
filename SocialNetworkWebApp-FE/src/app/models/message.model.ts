import { Chatroom } from "./chatroom.model";
import { User } from "./user.model";

export class Message {
    id: string = '';
    message: string = '';
    userId: string = '';
    chatroomId: string = '';

    user?: User;
    chatroom?: Chatroom;
}