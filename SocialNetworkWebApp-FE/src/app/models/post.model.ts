import { Util } from '../helpers/util';
import { Comment } from './comment.model';
import { Content } from './content.model';
import { React } from './react.model';
import { User } from './user.model';

export class Post {
    id: string
    caption: string;
    userId: string;
    sharePostId?: string;
    createdTime: Date;
    updatedTime: Date;

    contents?: Content[];
    reacts?: React[];
    comments?: Comment[];
    user?: User;

    constructor(id = '', caption = '', userId = '', createdTime = new Date(), updatedTime = new Date()) {
        this.id = id;
        this.caption = caption;
        this.userId = userId;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    getTimeDiff(): string {
        let now = new Date();
        let date = new Date(this.createdTime.valueOf());
        let diff = Math.round((now.getTime() - date.getTime()) / 60000);

        if (diff < 1) {
            return 'Just now';
        } else if (diff < 60) {
            return diff + ' minutes ago';
        } else if (diff < 1440) {
            let hour = diff < 120 ? 'hour' : 'hours';
            return Math.floor(diff / 60) + ' ' + hour + ' ago';
        }
        else if (diff < 10080) {
            let day = diff < 2880 ? 'day' : 'days';
            return Math.floor(diff / 1440) + ' ' + day + ' ago';
        }
        else {
            return Util.formatDate(date);
        }
    }
}