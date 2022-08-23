import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { ChattingService } from 'src/app/services/chatting.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { RelationService } from 'src/app/services/relation.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() currentUser?: User;
  @Input() user: User = new User();

  icons: string[] = ['uil uil-user-plus', "uil uil-user-times", 'uil uil-user-check', "uil uil-ban", 'uil uil-user-exclamation'];
  friendship?: Friendship;
  relationIndex = 0;

  constructor(
    private router: Router,
    private friendshipService: FriendshipService,
    private chatroomService: ChatroomService,
    private chattingService: ChattingService,
    private relationService: RelationService) { }

  ngOnInit(): void {
    if (this.user) {
      this.user = Object.assign(new User(), this.user);
    }

    this.getRelationship();
  }

  async getRelationship(): Promise<void> {
    if (this.currentUser && this.user) {
      this.friendship = await firstValueFrom(
        this.relationService.getRelationshipBetweenUsers(
          this.user.id, this.currentUser.id));

      this.relationIndex = this.friendship !== null ? (this.friendship.status + 1) : 0;
      if (this.relationIndex === 1 && this.friendship.friendId === this.currentUser.id) {
        this.relationIndex = 4;
      }
    }
  }

  onAddFriendButtonClick(): void {
    switch (this.relationIndex) {
      case 0: {
        this.addFriend();
        break;
      }
      case 1:
      case 2:
      case 3: {
        this.unFriend();
        break;
      }
      case 4: {
        this.navigateToWall();
        break;
      }
      default: break;
    }
  }

  addFriend(): void {
    if (this.currentUser) {
      let newFriendship = new Friendship();
      newFriendship.status = 0;
      newFriendship.userId = this.currentUser.id;
      newFriendship.friendId = this.user.id;

      this.friendshipService.add(newFriendship).subscribe(data => this.relationIndex = 1);
    }
  }

  async unFriend(): Promise<void> {
    if (this.friendship && this.currentUser) {
      this.friendshipService.delete(this.friendship.id).subscribe(data => this.relationIndex = 0);

      let chatroom = await lastValueFrom(this.chattingService.getChatroomByUserAndFriend(this.currentUser, this.user));
      if (chatroom) {
        this.chatroomService.delete(chatroom.id).subscribe(data => console.log(data));
      }
    }
  }

  navigateToWall(): void {
    if (this.currentUser) {
      this.router.navigateByUrl(`home/wall/${this.user.id}`)
    }
  }
}
