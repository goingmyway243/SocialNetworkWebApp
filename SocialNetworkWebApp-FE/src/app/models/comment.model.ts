import { User } from "./user.model";

export class Comment {
    id: string;
    comment: string;
    userId: string;
    postId: string;

    user?: User;

    constructor(id = '', comment = '', userId = '', postId = '') {
        this.id = id;
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
    }
}