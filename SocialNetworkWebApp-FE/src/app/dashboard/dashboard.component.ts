import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user?: User;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initElementsClickEvent();
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.userService
        .getById(userID)
        .subscribe(data =>
          this.user = Object.assign(new User, data),
          error => console.log(error));
    }
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }

  navigateToDashboard(): void {
    this.router.navigateByUrl('/home');
  }

  initElementsClickEvent(): void {
    const bell = document.querySelector('.notification') as HTMLElement;
    const popup = document.querySelector('.notification-popup') as HTMLElement;
    const notiCount = document.querySelector('.notification-count') as HTMLElement;

    bell.addEventListener('click', (event) => {
      event.stopPropagation();
      let visible = popup.style.display && popup.style.display !== 'none';
      popup.style.display = visible ? 'none' : 'block';
      notiCount.style.display = 'none';
    });

    popup.addEventListener('click', (event) => {
      event.stopPropagation();
    })

    window.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }
}
