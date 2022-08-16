import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Friendship } from 'src/app/models/friendship.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { FriendshipService } from 'src/app/services/friendship.service';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
import { RelationService } from 'src/app/services/relation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  currentUser: User = new User();
  myFeeds?: Post[];
  isMyWall: boolean = true;

  loggedUserId: string = '';

  friendship?: Friendship;
  relationIndex = 0;

  constructor(
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private friendshipService: FriendshipService,
    private relationService: RelationService,
    private newsfeedService: NewsFeedService) { }

  ngOnInit(): void {
    this.initTabsClickEvent();
    this.getWallInfomations();
  }

  async getWallInfomations(): Promise<void> {
    let userID = this.activedRoute.snapshot.paramMap.get('userId');
    this.loggedUserId = localStorage.getItem('authorizeToken') as string;

    this.isMyWall = userID == null;
    userID = this.isMyWall ? localStorage.getItem('authorizeToken') : userID;

    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));
      this.getMyFeeds();

      if (!this.isMyWall) {
        this.getRelationship();
      }
    }
  }

  async getRelationship(): Promise<void> {
    this.friendship = await firstValueFrom(
      this.relationService.getRelationshipBetweenUsers(
        this.loggedUserId, this.currentUser.id));

    this.relationIndex = this.friendship.status !== null ? (this.friendship.status + 1) : 0;
  }

  getMyFeeds(): void {
    this.newsfeedService
      .getUserFeeds(this.currentUser.id, true)
      .subscribe(data =>
        this.myFeeds = data,
        error => console.log(error));
  }

  addFriend(): void {
    if (this.currentUser) {
      let newFriendship = new Friendship();
      newFriendship.status = 0;
      newFriendship.userId = this.loggedUserId;
      newFriendship.friendId = this.currentUser.id;

      this.friendshipService.add(newFriendship).subscribe(data => this.relationIndex = 1);
    }
  }

  unFriend(): void {
    if (this.friendship) {
      this.friendshipService.delete(this.friendship.id).subscribe(data => this.relationIndex = 0);
    }
  }

  initTabsClickEvent(): void {
    const tabs = document.querySelectorAll('.tabs span');
    const postsLayout = document.querySelector('.container .posts-layout') as HTMLElement;
    const friendsLayout = document.querySelector('.container .friends-layout') as HTMLElement;
    const imagesLayout = document.querySelector('.container .images-layout') as HTMLElement;

    const removeActiveClass = () => {
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        removeActiveClass();
        tab.classList.add('active');

        postsLayout.style.display = 'none';
        friendsLayout.style.display = 'none';
        imagesLayout.style.display = 'none';

        if (tab.id === 'tab-posts') {
          postsLayout.style.display = 'grid';
        } else if (tab.id === 'tab-friends') {
          friendsLayout.style.display = 'block';
        }
        else if (tab.id === 'tab-images') {
          imagesLayout.style.display = 'block';
        }
      });
    });
  }
}
