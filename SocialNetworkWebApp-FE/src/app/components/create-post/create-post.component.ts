import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ContentService } from 'src/app/services/content.service';
import { PostService } from 'src/app/services/post.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() currentUser: User = new User();

  mediaContents: File[] = [];
  caption: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private postService: PostService,
    private contentService: ContentService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.initCreatePostEvent();
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }

  createPost(): void {
    let newPost = new Post();
    newPost.userId = this.currentUser.id;
    newPost.caption = this.caption;

    let counter = 0;
    this.postService.add(newPost).subscribe(async postId => {
      for (const media of this.mediaContents) {
        let fileExtension = media.name.split('.').pop();
        let fileName = `media${++counter}.${fileExtension}`;

        let content = new Content();
        content.postId = postId;
        content.linkContent = fileName;
        content.type = 1;

        await new Promise<void>((resolve, reject) => {
          this.uploadService.uploadImage(media, fileName, postId + '').subscribe(result => {
            this.contentService.add(content).subscribe(
              success => {
                console.log(success);
                resolve();
              },
              error => {
                console.error(error);
                resolve();
              }
            );
          });
        });
      }
      this.router.navigateByUrl('');
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.mediaContents.push(file);
    const wrapper = this.elementRef.nativeElement.querySelector('#image-wrapper');

    if (file) {
      let container = document.createElement('div');
      container.style.position = 'relative';
      container.style.width = '33%';
      container.style.height = '15rem';
      container.style.marginRight = '0.3rem';

      let removeBtn = document.createElement('span');
      removeBtn.innerHTML = '<i class="uil uil-multiply"></i>';

      removeBtn.style.position = 'absolute';
      removeBtn.style.top = '0.5rem';
      removeBtn.style.right = '0.5rem';
      removeBtn.style.fontSize = '1rem';
      removeBtn.style.color = 'white';
      removeBtn.style.fontWeight = '500';
      removeBtn.style.cursor = 'pointer';

      let img = document.createElement('img');

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(file); // set src to blob url
      img.style.width = '100%';
      img.style.height = '100%';
      // img.style.width = '30%';
      // img.style.height = '15rem';
      img.style.objectFit = 'cover';
      img.style.marginRight = '0.3rem';

      container.appendChild(img);
      container.appendChild(removeBtn);

      wrapper?.appendChild(container);
      this.showCreatePost();
    }
  }

  showCreatePost(): void {
    const modal = this.elementRef.nativeElement.querySelector('.posting') as HTMLElement;
    const textarea = this.elementRef.nativeElement.querySelector('.posting .textarea') as HTMLTextAreaElement;
    const addons = this.elementRef.nativeElement.querySelector('.add-ons') as HTMLElement;

    addons.style.display = this.mediaContents.length < 3 ? 'flex' : 'none';
    modal.style.display = 'grid';
    textarea.focus();
  }

  initCreatePostEvent(): void {
    const input = this.elementRef.nativeElement.querySelector('.create-post input') as HTMLInputElement;
    const modal = this.elementRef.nativeElement.querySelector('.posting') as HTMLElement;

    input.addEventListener('click', () => this.showCreatePost());

    modal.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('posting')) {
        modal.style.display = 'none';
      }
    });
  }
}
