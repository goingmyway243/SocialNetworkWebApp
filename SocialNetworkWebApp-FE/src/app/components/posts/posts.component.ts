import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() postData?: Post;
  postOwner: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.postData = Object.assign(new Post(), this.postData);
    this.getPostOwner();
  }

  getPostOwner(): void {
    if (this.postData) {
      this.userService
        .getById(this.postData.userId)
        .subscribe(data =>
          this.postOwner = Object.assign(new User, data),
          error => console.log(error));
    }
  }
}
