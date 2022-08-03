import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  currentUser: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.initTabsClickEvent();
  }

  getCurrentUser(): void {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.userService
        .getById(userID)
        .subscribe(data =>
          this.currentUser = Object.assign(new User, data),
          error => console.log(error));
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

        if (tab.id == 'tab-posts') {
          postsLayout.style.display = 'grid';
        } else if (tab.id == 'tab-friends') {
          friendsLayout.style.display = 'block';
        }
        else if (tab.id == 'tab-images') {
          imagesLayout.style.display = 'block';
        }
      });
    });
  }
}
