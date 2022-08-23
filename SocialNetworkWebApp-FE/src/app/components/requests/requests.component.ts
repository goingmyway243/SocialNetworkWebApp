import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { ChattingService } from 'src/app/services/chatting.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() friendshipData!: Friendship;
  @Input() currentUser!: User;

  user: User = new User();
  response: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private friendshipService: FriendshipService,
    private chatroomService: ChatroomService,
    private chattingService: ChattingService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getById(this.friendshipData.userId).subscribe(data => this.user = data);
  }

  async accept(): Promise<void> {
    if (this.friendshipData.status === 0) {
      this.friendshipData.status = 1;
      this.friendshipService.update(this.friendshipData).subscribe(data => this.showResponse('accepted'));

      let chatroom = new Chatroom();
      chatroom.chatroomName = '';
      chatroom.id = await lastValueFrom(this.chatroomService.add(chatroom));

      chatroom.chatMembers.push(...[this.user, this.currentUser]);
      this.chatroomService.update(chatroom).subscribe();
    }
  }

  decline(): void {
    this.friendshipService.delete(this.friendshipData.id).subscribe(_ => this.showResponse('declined'));
  }

  showResponse(result: string): void {
    const buttons = this.elementRef.nativeElement.querySelector('.action') as HTMLElement;
    const responseElm = this.elementRef.nativeElement.querySelector('.response') as HTMLElement;

    buttons.style.display = 'none';
    responseElm.style.display = 'block';

    this.response = result;
  }

  navigateToWall(): void {
    this.router.navigateByUrl(`home/wall/${this.friendshipData.userId}`);
  }
}
