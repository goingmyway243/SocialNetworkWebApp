import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Comment } from 'src/app/models/comment.model';
import { Content } from 'src/app/models/content.model';
import { Post } from 'src/app/models/post.model';
import { React } from 'src/app/models/react.model';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { NewsFeedService } from 'src/app/services/newfeeds.service';
import { PostService } from 'src/app/services/post.service';
import { ReactService } from 'src/app/services/react.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {
  @Input() postData?: Post;
  @Input() currentUser!: User;
  postOwner: User = new User();
  postReacts: React[] = [];
  postComments: Comment[] = [];
  captionArray?: string[];

  likedByString: string = '';
  userReact?: React;
  comment: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private reactService: ReactService,
    private newsfeedService: NewsFeedService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.convertPostData();
    this.getPostReacts();
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

  async getPostReacts(): Promise<void> {
    if (this.postData) {
      this.postReacts = await lastValueFrom(this.newsfeedService.getPostReacts(this.postData.id));
      this.userReact = this.postReacts.find(react => react.userId == this.currentUser!.id);

      let length = this.postReacts.length;

      if (length > 0) {
        let otherUser = await firstValueFrom(this.userService.getById(this.postReacts[0].userId));
        this.likedByString = this.userReact ? 'Liked by you' : `Liked by ${otherUser.getFullName()}`;

        if (length == 2) {
          this.likedByString += ` and other one`;
        } else if (length > 2) {
          this.likedByString += ` and ${length - 1} others`;
        }
      }
      else {
        this.likedByString = '';
      }
    }
  }

  async getPostComments(): Promise<void> {
    if (this.postData) {
      // this.postComments = await lastValueFrom(this.newsfeedService.getPostReacts(this.postData.id));
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

  createComment(): void {
    if (this.comment && this.postData) {
      let newComment = new Comment();
      newComment.postId = this.postData.id;
      newComment.userId = this.currentUser.id;
      newComment.comment = this.comment;

      this.commentService.add(newComment).subscribe();
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

  onLikeButtonClick(): void {
    if (this.postData && this.currentUser) {
      if (this.userReact) {
        this.reactService.delete(this.userReact.id).subscribe(success => this.getPostReacts());
      }
      else {
        let react = new React();
        react.postId = this.postData.id;
        react.userId = this.currentUser.id;
        react.type = 0;

        this.reactService.add(react).subscribe(success => this.getPostReacts());
      }
    }
  }

  onCommentButtonClick(): void {
    const input = this.elementRef.nativeElement.querySelector('.create-comment input') as HTMLInputElement;
    input.focus();
  }

  navigateToWall(): void {
    if (this.currentUser && this.currentUser.id === this.postOwner.id) {
      this.router.navigateByUrl('home/wall');
    }
    else {
      this.router.navigateByUrl(`home/wall/${this.postOwner.id}`);
    }
  }
}
