import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  currentUser: User = new User();
  myFeeds?: Post[];

  constructor(private userService: UserService,
    private newsfeedService: NewsFeedService) { }

  ngOnInit(): void {
    this.initTabsClickEvent();
    this.getWallInfomations();
  }

  async getWallInfomations(): Promise<void> {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));
      this.getMyFeeds();
    }
  }

  getMyFeeds(): void {
    this.newsfeedService
      .getUserFeeds(this.currentUser.id)
      .subscribe(data =>
        this.myFeeds = data,
        error => console.log(error));
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
