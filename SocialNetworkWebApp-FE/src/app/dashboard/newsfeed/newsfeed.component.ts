import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CreatePostComponent } from 'src/app/components/create-post/create-post.component';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
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
  newFeeds?: Post[];

  constructor(private router: Router,
    private userService: UserService,
    private newsfeedService: NewsFeedService) { }

  ngOnInit(): void {
    this.getHomeInfomations();
  }

  async getHomeInfomations(): Promise<void> {
    let userID = localStorage.getItem('authorizeToken');
    if (userID) {
      this.currentUser = await firstValueFrom(this.userService.getById(userID));
      this.getNewFeeds();
    }
  }

  getNewFeeds(): void {
    this.newsfeedService
      .getUserFeeds(this.currentUser.id)
      .subscribe(data =>
        this.newFeeds = data,
        error => console.log(error));
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

  showSettings(show: boolean): void {
    console.log(true);

    const tabHome = document.querySelector('.tab-home') as HTMLElement;
    const tabSettings = document.querySelector('.tab-settings') as HTMLElement;

    tabHome.style.display = !show ? 'block' : 'none';
    tabSettings.style.display = show ? 'block' : 'none';
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }
}
