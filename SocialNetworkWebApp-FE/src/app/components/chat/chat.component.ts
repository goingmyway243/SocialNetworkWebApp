import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() currentUser!: User;
  @Input() chatroomData!: Chatroom;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  chatUser: User = new User();
  message: string = '';

  chatMessages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getChatUser();
    this.getChatMessages();
  }

  getChatUser(): void {
    this.chatUser = this.currentUser.id === this.chatroomData.chatMembers[0].id ?
      this.chatroomData.chatMembers[1] : this.chatroomData.chatMembers[0];

    this.chatUser = Object.assign(new User(), this.chatUser);
  }

  getChatMessages(): void {

  }

  close(): void {
    this.onClose.emit(false);
  }

  sendMessage(): void {
    this.message = '';

    let newMessage = new Message();
    newMessage.chatroomId = this.chatroomData.id;
    newMessage.userId = this.currentUser.id;
    newMessage.message = this.message;

    this.messageService.add(newMessage).subscribe(success => {
      this.chatMessages.push(newMessage);
    });
  }
}
