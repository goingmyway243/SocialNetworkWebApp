export class Post {
    id: string
    caption: string;
    userId: string;
    sharePostId: string;

    constructor(id = '', caption = '', userId = '', sharePostId = '') {
        this.id = id;
        this.caption = caption;
        this.userId = userId;
        this.sharePostId = sharePostId;
    }
}