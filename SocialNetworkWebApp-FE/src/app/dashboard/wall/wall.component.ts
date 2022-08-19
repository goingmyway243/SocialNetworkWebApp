import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Util } from 'src/app/helpers/util';
import { Content } from 'src/app/models/content.model';
import { Friendship } from 'src/app/models/friendship.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { FriendshipService } from 'src/app/services/friendship.service';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
import { RelationService } from 'src/app/services/relation.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  currentUser: User = new User();
  loggedUser: User = new User();
  myFeeds: Post[] = [];
  friends: Friendship[] = [];
  images: Content[] = [];
  isMyWall: boolean = true;

  paging: number = 0;
  loggedUserId: string = '';
  friendCountStr: string = '';

  friendship?: Friendship;
  relationIndex = 0;

  avatar?: File;

  constructor(
    private elementRef: ElementRef,
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private friendshipService: FriendshipService,
    private relationService: RelationService,
    private newsfeedService: NewsFeedService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.initTabsClickEvent();
    this.initUploadAvatarClickEvent();
    this.getWallInfomations();
  }

  async getWallInfomations(): Promise<void> {
    let userID = this.activedRoute.snapshot.paramMap.get('userId');
    this.loggedUserId = localStorage.getItem('authorizeToken') as string;

    this.isMyWall = userID == null;
    userID = this.isMyWall ? this.loggedUserId : userID;

    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));
      this.loggedUser = this.currentUser;
      this.getMyFeeds();
      this.getFriends();

      if (!this.isMyWall) {
        this.loggedUser = await firstValueFrom(this.userService.getById(this.loggedUserId));
        this.getRelationship();
      }
    }
  }

  async getRelationship(): Promise<void> {
    this.friendship = await firstValueFrom(
      this.relationService.getRelationshipBetweenUsers(
        this.loggedUserId, this.currentUser.id));

    this.relationIndex = this.friendship.status !== null ? (this.friendship.status + 1) : 0;
    if (this.relationIndex === 1 && this.friendship.friendId === this.currentUser.id) {
      this.relationIndex = 4;
    }
  }

  getMyFeeds(): void {
    this.newsfeedService
      .getUserFeeds(this.currentUser.id, this.paging, true)
      .subscribe(data =>
        this.myFeeds = data,
        error => console.log(error));
  }

  getFriends(): void {
    this.relationService
      .getUserRelationship(this.currentUser.id)
      .subscribe(data => {
        this.friends = data;
        this.friendCountStr = this.friends.length + ' friend';
        if (this.friends.length > 1) {
          this.friendCountStr += 's';
        }
      });

  }

  getImages(): void {
    if (this.images.length == 0) {
      this.myFeeds.forEach(post => this.images.push(...post.contents!));
    }
  }

  getFullLinkContent(content: Content): string {
    return Util.getFullLinkContent(content);
  }

  addFriend(): void {
    if (this.currentUser) {
      let newFriendship = new Friendship();
      newFriendship.status = 0;
      newFriendship.userId = this.loggedUserId;
      newFriendship.friendId = this.currentUser.id;

      this.friendshipService.add(newFriendship).subscribe(data => this.getRelationship());
    }
  }

  acceptFriendRequest(): void {
    if (this.friendship && this.friendship.status === 0) {
      this.friendship.status = 1;
      this.friendshipService.update(this.friendship).subscribe(data => this.getRelationship());
    }
  }

  unFriend(): void {
    if (this.friendship) {
      this.friendshipService.delete(this.friendship.id).subscribe(data => this.relationIndex = 0);
    }
  }

  chooseAvatar(event: any): void {
    this.avatar = event.target.files[0];

    if (this.avatar) {

      if ((this.avatar.size / 1024 / 1024) > 2) {
        Swal.fire(
          'Too large!',
          'Maximum size of an avatar is 2MB',
          'error'
        );
        return;
      }

      const uploadAvatar = this.elementRef.nativeElement.querySelector('.upload-avatar') as HTMLElement;
      const img = this.elementRef.nativeElement.querySelector('.upload-avatar .avatar') as HTMLImageElement;

      uploadAvatar.style.display = 'grid';

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(this.avatar); // set src to blob url
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
    }
  }

  uploadAvatar(): void {
    if (this.avatar) {
      this.uploadService.uploadImage(this.avatar, this.currentUser.id).subscribe(_ => {
        const img = this.elementRef.nativeElement.querySelector('.head .profile-picture img') as HTMLImageElement;
        const uploadAvatar = this.elementRef.nativeElement.querySelector('.upload-avatar') as HTMLElement;

        img.onload = () => {
          URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
        img.src = URL.createObjectURL(this.avatar!); // set src to blob url

        // uploadAvatar.click();
        window.location.reload();
      });
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
          friendsLayout.style.display = 'grid';
        }
        else if (tab.id === 'tab-images') {
          imagesLayout.style.display = 'grid';
          this.getImages();
        }
      });
    });
  }

  initUploadAvatarClickEvent() {
    const uploadAvatar = this.elementRef.nativeElement.querySelector('.upload-avatar') as HTMLElement;
    uploadAvatar.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('upload-avatar')) {
        uploadAvatar.style.display = 'none';
      }
    })
  }
}
