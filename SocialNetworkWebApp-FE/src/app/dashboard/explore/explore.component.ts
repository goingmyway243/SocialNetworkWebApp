import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  currentUser: User = new User();
  newFeeds?: Post[];

  constructor(private router: Router,
    private userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getNewFeeds();
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

  getNewFeeds(): void {
    this.postService
      .getAll()
      .subscribe(data => {
        this.newFeeds = data;
        console.log(this.newFeeds);
      },
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
