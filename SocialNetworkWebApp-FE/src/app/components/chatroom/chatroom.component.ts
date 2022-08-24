import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { ChattingService } from 'src/app/services/chatting.service';

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
  latestMessage: Message = new Message();

  constructor(private chattingService: ChattingService) { }

  ngOnInit(): void {
    this.getChatUser();
    this.getLatestMessage();
  }

  getChatUser(): void {
    this.chatUser = this.currentUser.id === this.chatroomData.chatMembers[0].id ?
      this.chatroomData.chatMembers[1] : this.chatroomData.chatMembers[0];

    this.chatUser = Object.assign(new User(), this.chatUser);
  }

  getLatestMessage(): void {
    this.chattingService.getMessageByChatroomId(this.chatroomData.id, true).subscribe(data => {
      this.latestMessage = data[0];
    });
  }

  chatroomSelect(): void {
    this.onChatroomSelect.emit(this.chatroomData);
  }
}
