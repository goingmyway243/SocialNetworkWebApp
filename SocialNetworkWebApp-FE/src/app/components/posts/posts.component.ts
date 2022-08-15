import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Content } from 'src/app/models/content.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {
  @Input() postData?: Post;
  postOwner: User = new User();
  captionArray?: string[];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.convertPostData();
  }

  ngAfterViewInit(): void {
    this.handleMultiImages();
  }

  convertPostData(): void {
    this.postData = Object.assign(new Post(), this.postData);
    this.captionArray = this.postData.caption.split('\n');

    this.getPostOwner();
  }

  getPostOwner(): void {
    if (this.postData) {
      this.userService
        .getById(this.postData.userId)
        .subscribe(data =>
          this.postOwner = data,
          error => console.log(error));
    }
  }

  getFullLinkContent(content: Content): string {
    return AppComponent.baseUrl + 'app-images/' + content.postId + '/' + content.linkContent;
  }

  handleMultiImages(): void {
    if (this.postData && this.postData.contents) {
      let length = this.postData.contents.length;

      if (length > 1) {
        const wrapper = this.elementRef.nativeElement.querySelector('.photo') as HTMLElement;
        const images = wrapper.querySelectorAll('.photo img');

        wrapper.style.display = 'flex';
        images.forEach(img => {
          (img as HTMLElement).style.width = (100 / length) + '%';
        });
      }

    }
  }

  onEllipsisButtonClick(): void {
    const popup = this.elementRef.nativeElement.querySelector('.edit .edit-popup');

    if (popup) {
      let visible = popup.style.display && popup.style.display !== 'none';
      popup.style.display = visible ? 'none' : 'block';
    }
  }

  onDeleteButtonClick(): void {
    if (this.postData) {
      this.postService.delete(this.postData.id).subscribe(data => this.router.navigateByUrl(''));
    }
  }
}
