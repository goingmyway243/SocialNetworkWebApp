import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentData!: Comment;
  @Output() onAvatarClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.commentData.user = Object.assign(new User(), this.commentData.user);
  }

  avatarClick(): void {
    this.onAvatarClick.emit(this.commentData.user!.id);
  }
}
