import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Util } from 'src/app/helpers/util';
import { Comment } from 'src/app/models/comment.model';
import { Content } from 'src/app/models/content.model';
import { Post } from 'src/app/models/post.model';
import { React } from 'src/app/models/react.model';
import { User } from 'src/app/models/user.model';
import { AdditionalService } from 'src/app/services/additional.service';
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

  captionArray: string[] = [];

  sharePostData?: Post;
  shareCaptionArray: string[] = [];
  sharePostOwner: User = new User();
  sharePostTimeDiff: string = '';

  likedByString: string = '';
  userReact?: React;
  comment: string = '';
  shareCaption: string = '';

  commentPaging: number = 0;
  commentSize: number = 1;

  commentCountString: string = '';

  canViewMore: boolean = false;
  splitComment: boolean = true;
  editMode: boolean = false;

  timeDiff: string = '';
  editCaption: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private reactService: ReactService,
    private newsfeedService: NewsFeedService,
    private commentService: CommentService,
    private additionalService: AdditionalService) { }

  ngOnInit(): void {
    this.initSharePostClickEvent();

    this.convertPostData();
    this.getTimeDiff();
    this.getPostOwner();
    this.getPostReacts(false);
    this.getPostComments(this.commentSize);
  }

  ngAfterViewInit(): void {
    this.handleMultiImages();
    this.setEditMode(false);
  }

  convertPostData(): void {
    this.postData = Object.assign(new Post(), this.postData);
    this.captionArray = this.postData.caption.split('\n');

    if (this.postData.sharePostId) {
      this.additionalService.getSharePost(this.postData.sharePostId).subscribe(data => {
        this.sharePostData = data;
        this.shareCaptionArray = this.sharePostData.caption.split('\n');
        this.sharePostOwner = Object.assign(new User(), this.sharePostData.user);
        this.sharePostTimeDiff = Util.getTimeDiff(this.sharePostData.createdTime);
      });
    }
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

  async getPostReacts(update: boolean): Promise<void> {
    if (this.postData) {
      if (update) {
        this.postData.reacts = await lastValueFrom(this.newsfeedService.getPostReacts(this.postData.id));
      }

      this.userReact = this.postData.reacts!.find(react => react.userId == this.currentUser!.id);

      let length = this.postData.reacts!.length;

      if (length > 0) {
        let otherUser = await firstValueFrom(this.userService.getById(this.postData.reacts![0].userId));
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

  async getPostComments(size: number = -1): Promise<void> {
    if (this.postData) {
      this.splitComment = true;
      this.commentPaging = 0;

      this.postData.comments = await lastValueFrom(this.newsfeedService.getPostComments(this.postData.id, this.commentPaging));

      this.canViewMore = this.postData.comments.length > size;
      this.postData.comments = this.postData.comments.slice(-size);

      this.getCommentCount();
    }
  }

  async getPostCommentsWithPaging(): Promise<void> {
    if (this.postData) {
      let comments = await lastValueFrom(this.newsfeedService.getPostComments(this.postData.id, this.commentPaging));

      if (comments.length == 0) {
        this.canViewMore = false;
        return;
      }

      if (this.splitComment) {
        this.postData.comments = [];
        this.splitComment = false;
        this.commentSize = 1;
      }

      comments = comments.concat(this.postData.comments!);
      this.postData.comments = comments;

      this.commentPaging++;

      this.getCommentCount();
    }
  }

  async getCommentCount(): Promise<void> {
    if (this.postData) {
      let commentCount = await lastValueFrom(this.additionalService.getTotalComments(this.postData.id));

      if (commentCount <= 0) {
        this.commentCountString = '';
      }
      else if (commentCount == 1) {
        this.commentCountString = '1 comment';
      } else if (commentCount > 1) {
        this.commentCountString = `${commentCount} comments`;
      }
    }
  }

  getFullLinkContent(content: Content): string {
    return Util.getFullLinkContent(content);
  }

  getTimeDiff() {
    if (this.postData) {
      this.timeDiff = Util.getTimeDiff(this.postData.createdTime);
    }
  }

  handleMultiImages(): void {
    if (this.postData && this.postData.contents) {
      let length = this.postData.contents.length;

      if (length > 1) {
        const wrappers = this.elementRef.nativeElement.querySelectorAll('.photo') as HTMLElement[];

        wrappers.forEach(wrapper => {
          const images = wrapper.querySelectorAll('.photo img');

          wrapper.style.display = 'flex';
          images.forEach(img => {
            (img as HTMLElement).style.width = (100 / length) + '%';
          });
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

      this.comment = '';

      this.commentService.add(newComment).subscribe(success => this.getPostComments(++this.commentSize));
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

  setEditMode(mode: boolean): void {
    const input = this.elementRef.nativeElement.querySelector('.input-edit') as HTMLInputElement;

    this.editMode = mode;
    input.style.display = mode ? 'block' : 'none';

    if (mode && this.postData) {
      const popup = this.elementRef.nativeElement.querySelector('.edit .edit-popup');

      this.editCaption = this.postData.caption;
      popup.style.display = 'none';
      input.focus();
    }
  }

  onEditInput(event: any): void {
    if (this.postData) {
      let isDifferent = event.target.value !== this.postData.caption;
      const saveButton = this.elementRef.nativeElement.querySelector('.edit-mode .btn-primary') as HTMLButtonElement;
      saveButton.disabled = !isDifferent;
    }
  }

  onSaveButtonClick(): void {
    if (this.postData) {
      this.postData.caption = this.editCaption;

      this.postService.update(this.postData).subscribe(success => {
        this.setEditMode(false);
        this.captionArray = this.postData!.caption.split('\n');
      });
    }
  }

  onLikeButtonClick(): void {
    if (this.postData && this.currentUser) {
      if (this.userReact) {
        this.reactService.delete(this.userReact.id).subscribe(success => this.getPostReacts(true));
      }
      else {
        let react = new React();
        react.postId = this.postData.id;
        react.userId = this.currentUser.id;
        react.type = 0;

        this.reactService.add(react).subscribe(success => this.getPostReacts(true));
      }
    }
  }

  onCommentButtonClick(): void {
    const input = this.elementRef.nativeElement.querySelector('.create-comment input') as HTMLInputElement;
    input.focus();
  }

  onShareButtonClick(): void {
    const sharing = this.elementRef.nativeElement.querySelector('.create-share') as HTMLElement;
    const input = this.elementRef.nativeElement.querySelector('.create-share .textarea') as HTMLInputElement;

    sharing.style.display = 'grid';
    input.focus();
  }

  sharePost(): void {
    if (this.postData) {
      let sharePost = new Post();
      sharePost.sharePostId = this.postData.sharePostId ? this.postData.sharePostId : this.postData.id;
      sharePost.userId = this.currentUser.id;
      sharePost.caption = this.shareCaption;

      this.postService.add(sharePost).subscribe(success => this.router.navigateByUrl(''));
    }
  }

  initSharePostClickEvent(): void {
    const sharing = this.elementRef.nativeElement.querySelector('.create-share') as HTMLElement;
    sharing.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('create-share')) {
        sharing.style.display = 'none';
        this.shareCaption = '';
      }
    });
  }

  navigateToWall(userId: string = ''): void {
    userId = userId ? userId : this.postOwner.id;

    if (this.currentUser && this.currentUser.id === userId) {
      this.router.navigateByUrl('home/wall');
    }
    else {
      this.router.navigateByUrl(`home/wall/${userId}`);
    }
  }

}
