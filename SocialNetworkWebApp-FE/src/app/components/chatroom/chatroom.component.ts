import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  @Input() chatroomData!: Chatroom;
  @Input() currentUser!: User;

  @Output() onChatroomSelect: EventEmitter<Chatroom> = new EventEmitter();

  chatUser: User = new User();

  constructor() { }

  ngOnInit(): void {
    this.getChatUser();
  }

  getChatUser(): void {
    this.chatUser = this.currentUser.id === this.chatroomData.chatMembers[0].id ?
      this.chatroomData.chatMembers[1] : this.chatroomData.chatMembers[0];

    this.chatUser = Object.assign(new User(), this.chatUser);
  }

  chatroomSelect(): void {
    this.onChatroomSelect.emit(this.chatroomData);
  }
}
