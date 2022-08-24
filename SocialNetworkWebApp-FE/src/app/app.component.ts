import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialNetworkWebApp';
  static baseUrl: string = 'https://localhost:5001/';
  static httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Content-Type': 'application/json'
    })
  };
  static defaultAvatar: string = AppComponent.baseUrl + 'app-images/default.jpg';
  static currentUser: User = new User();

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authorizeToken');
    this.router.navigateByUrl(token ? '/home' : '/auth');
  }
}
