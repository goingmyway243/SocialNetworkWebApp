import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CreatePostComponent } from 'src/app/components/create-post/create-post.component';
import { Friendship } from 'src/app/models/friendship.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
import { RelationService } from 'src/app/services/relation.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  @ViewChild(CreatePostComponent) createPost?: CreatePostComponent;

  currentUser: User = new User();
  newFeeds: Post[] = [];
  friends: Friendship[] = [];
  friendRequests: Friendship[] = [];

  paging: number = 0;
  canLoadMore: boolean = true;

  constructor(private router: Router,
    private userService: UserService,
    private newsfeedService: NewsFeedService,
    private relationService: RelationService) { }

  ngOnInit(): void {
    this.initLoadMoreScrollEvent();
    this.getHomeInfomations();
  }

  async getHomeInfomations(): Promise<void> {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));

      this.getNewFeeds();
      this.getFriendRequests();
    } else {
      this.router.navigateByUrl('');
    }
  }

  getNewFeeds(): void {
    this.newsfeedService
      .getUserFeeds(this.currentUser.id, this.paging, false)
      .subscribe(data =>
        this.newFeeds = data,
        error => console.log(error));

    this.paging++;
  }

  getFriends(): void {
    this.relationService.getUserRelationship(this.currentUser.id).subscribe(data => this.friends = data);
  }

  getFriendRequests(): void {
    this.relationService.getFriendRequestByUserId(this.currentUser.id).subscribe(data => this.friendRequests = data);
  }

  logout(): void {
    Swal.fire({
      icon: 'question',
      title: 'Logout',
      text: 'Are you sure?',
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'No, stay here',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('authorizeToken');

        console.log(localStorage);
        this.router.navigateByUrl('');
      }
    });
  }

  showTab(tabIndex: number): void {
    const tabHome = document.querySelector('.tab-home') as HTMLElement;
    const tabFriends = document.querySelector('.tab-friends') as HTMLElement;
    const tabSettings = document.querySelector('.tab-settings') as HTMLElement;

    tabHome.style.display = 'none';
    tabFriends.style.display = 'none';
    tabSettings.style.display = 'none';

    switch (tabIndex) {
      case 0: {
        tabHome.style.display = 'block';
        break;
      } case 1: {
        tabFriends.style.display = 'block';
        this.getFriends();
        break;
      } case 2: {
        tabSettings.style.display = 'block';
        break;
      }
      default:
        break;
    }
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }

  createPostButtonClick(): void {
    if (this.createPost) {
      this.createPost.showCreatePost();
      this.showTab(0);
    }
  }

  initLoadMoreScrollEvent(): void {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && this.canLoadMore) {
        this.newsfeedService
          .getUserFeeds(this.currentUser.id, this.paging, false)
          .subscribe(data => {
            this.canLoadMore = false;

            if (data.length > 0) {
              this.newFeeds.push(...data);
              this.canLoadMore = true;
              this.paging++;
            }
          });
      }
    };
  }
}
