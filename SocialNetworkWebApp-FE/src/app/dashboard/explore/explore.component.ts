import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
import { ChattingService } from 'src/app/services/chatting.service';
import { RelationService } from 'src/app/services/relation.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  currentUser: User = new User();
  chatroomData: Chatroom = new Chatroom();

  searchedUsers: User[] = [];
  friends: Friendship[] = [];
  friendRequests: Friendship[] = [];
  chatrooms: Chatroom[] = [];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private searchService: SearchService,
    private relationService: RelationService,
    private chattingService: ChattingService) { }

  ngOnInit(): void {
    this.searchUserByKeyword();
  }

  async getUserInformation(): Promise<void> {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));

      this.getFriendRequests();
      this.getChatrooms();
    }
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

  async searchUserByKeyword(): Promise<void> {
    await this.getUserInformation();

    let keyword = this.activedRoute.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.searchService.search(this.currentUser.id, keyword).subscribe(data => this.searchedUsers = data, error => console.log(error));
    }
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

  showChatroom(chatroom: Chatroom | null, isShow: boolean): void {
    const popup = this.elementRef.nativeElement.querySelector('.chatroom');
    popup.style.display = isShow ? 'block' : 'none';

    if (chatroom) {
      this.chatroomData = chatroom;
    }
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
}
