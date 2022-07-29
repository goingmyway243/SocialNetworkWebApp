import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initElementsClickEvent();
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
