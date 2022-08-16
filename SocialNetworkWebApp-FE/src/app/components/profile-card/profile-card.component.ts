import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
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

  icons: string[] = ['uil uil-user-plus', 'uil uil-user-exclamation', 'uil uil-user-check'];
  friendship?: Friendship;
  relationIndex = 0;

  constructor(
    private router: Router,
    private friendshipService: FriendshipService,
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

      this.relationIndex = this.friendship.status !== null ? (this.friendship.status + 1) : 0;
    }
  }

  onAddFriendButtonClick(): void {
    switch (this.relationIndex) {
      case 0: {
        this.addFriend();
        break;
      }
      case 1:
      case 2: {
        this.unFriend();
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

  unFriend(): void {
    if (this.friendship) {
      this.friendshipService.delete(this.friendship.id).subscribe(data => this.relationIndex = 0);
    }
  }

  navigateToWall(): void {
    if (this.currentUser) {
      this.router.navigateByUrl(`home/wall/${this.user.id}`)
    }
  }
}
