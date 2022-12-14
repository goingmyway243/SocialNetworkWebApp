import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CreatePostComponent } from 'src/app/components/create-post/create-post.component';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Friendship } from 'src/app/models/friendship.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ChattingService } from 'src/app/services/chatting.service';
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
  chatroomData: Chatroom = new Chatroom();
  newFeeds: Post[] = [];
  friends: Friendship[] = [];
  friendRequests: Friendship[] = [];
  chatrooms: Chatroom[] = [];

  paging: number = 0;
  canLoadMore: boolean = true;

  changePassForm: FormGroup = new FormGroup('');

  currentPassStr: string = '';
  newPassStr: string = '';
  confirmPassStr: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private newsfeedService: NewsFeedService,
    private relationService: RelationService,
    private chattingService: ChattingService) { }

  ngOnInit(): void {
    this.initLoadMoreScrollEvent();
    this.initChangePassFormGroup();
    this.initChangePassClickEvent();

    this.getHomeInfomations();
  }

  async getHomeInfomations(): Promise<void> {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));

      this.getNewFeeds();
      this.getFriendRequests();
      this.getChatrooms();
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

  getChatrooms(): void {
    this.chattingService.getAllChatroomsByUserId(this.currentUser.id).subscribe(data => this.chatrooms = data);
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
        this.router.navigateByUrl('');
      }
    });
  }

  changePassword(): void {
    let valid = true;
    let message = '';

    if (this.changePassForm.invalid) {
      return;
    }

    if (this.currentPassStr !== this.currentUser.password) {
      valid = false;
      message = 'Current password is incorrect!';
    }
    else if (this.currentPassStr === this.newPassStr) {
      valid = false;
      message = 'New password must be different from current password!';
    }
    else if (this.newPassStr !== this.confirmPassStr) {
      valid = false;
      message = 'Re-type password is incorrect!';
    }

    if (!valid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });

      return;
    }

    this.currentUser.password = this.newPassStr;
    this.userService.update(this.currentUser).subscribe(success => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Change password successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(result => {
        localStorage.removeItem('authorizeToken');
        this.router.navigateByUrl('');
      });
    });
  }

  showChatroom(chatroom: Chatroom | null, isShow: boolean): void {
    const popup = this.elementRef.nativeElement.querySelector('.chatroom');
    popup.style.display = isShow ? 'block' : 'none';

    if (chatroom) {
      this.chatroomData = chatroom;
    }
  }

  showChangePass(): void {
    const popup = this.elementRef.nativeElement.querySelector('.change-password') as HTMLElement;
    popup.style.display = 'grid';
  }

  showTab(tabIndex: number): void {
    const tabHome = this.elementRef.nativeElement.querySelector('.tab-home') as HTMLElement;
    const tabFriends = this.elementRef.nativeElement.querySelector('.tab-friends') as HTMLElement;
    const tabSettings = this.elementRef.nativeElement.querySelector('.tab-settings') as HTMLElement;

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

  initChangePassClickEvent(): void {
    const popup = this.elementRef.nativeElement.querySelector('.change-password') as HTMLElement;

    popup.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('change-password')) {
        popup.style.display = 'none';
      }
    });
  }

  initChangePassFormGroup(): void {
    this.changePassForm = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    });
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
