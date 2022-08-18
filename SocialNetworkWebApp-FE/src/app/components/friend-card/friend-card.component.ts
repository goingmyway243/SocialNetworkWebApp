import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
import { FriendshipService } from 'src/app/services/friendship.service';
import { RelationService } from 'src/app/services/relation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() friendship!: Friendship;
  @Input() currentUser!: User;

  user: User = new User();

  icons: string[] = ['uil uil-user-plus', "uil uil-user-times", 'uil uil-user-check', "uil uil-ban", 'uil uil-user-exclamation'];
  relationIndex = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private friendshipService: FriendshipService,
    private relationService: RelationService) { }

  ngOnInit(): void {
    this.friendship = Object.assign(new Friendship(), this.friendship);

    let id = this.friendship.userId === this.currentUser.id ? this.friendship.friendId : this.friendship.userId;
    this.userService.getById(id).subscribe(data => this.user = data);

    this.getRelationship(false);
  }

  async getRelationship(update: boolean): Promise<void> {
    if (update) {
      this.friendship = await firstValueFrom(
        this.relationService.getRelationshipBetweenUsers(
          this.user.id, this.currentUser.id));
    }

    this.relationIndex = this.friendship.status !== null ? (this.friendship.status + 1) : 0;
    if (this.relationIndex === 1 && this.friendship.friendId === this.currentUser.id) {
      this.relationIndex = 4;
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
