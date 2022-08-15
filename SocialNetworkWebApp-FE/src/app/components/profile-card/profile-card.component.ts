import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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
  friendship: Friendship = new Friendship();
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
      this.friendship = await lastValueFrom(
        this.relationService.getRelationshipBetweenUsers(
          this.user.id, this.currentUser.id));

      this.relationIndex = this.friendship.status ? this.friendship.status : 0;
    }
  }

  addFriend(): void {
    if (this.currentUser) {
      let friendship = new Friendship();
      friendship.status = 0;
      friendship.userId = this.currentUser.id;
      friendship.friendId = this.user.id;

      this.friendshipService.add(friendship).subscribe(data => console.log(data));
    }
  }

  navigateToWall(): void {
    if (this.currentUser) {
      this.router.navigateByUrl(`home/wall/${this.user.id}`)
    }
  }
}
