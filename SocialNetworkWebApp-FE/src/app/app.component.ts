import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialNetworkWebApp';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authorizeToken');
    this.router.navigateByUrl(token ? '/home' : '/auth');
  }
}
