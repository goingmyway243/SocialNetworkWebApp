export class Post {
    id: string
    caption: string;
    userId: string;
    sharePostId?: string;

    constructor(id = '', caption = '', userId = '') {
        this.id = id;
        this.caption = caption;
        this.userId = userId;
    }
}