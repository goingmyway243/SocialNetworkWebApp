import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private router: Router,
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

    let counter =0;
    this.postService.add(newPost).subscribe(postId => {

      this.mediaContents.forEach(media =>{
        let fileExtension = media.name.split('.').pop();
        let fileName = `media${++counter}.${fileExtension}`;

        let content = new Content();
        content.postId = postId;
        content.linkContent = fileName;
        content.type = 1;
  
        this.uploadService.uploadImage(media, fileName, postId+'').subscribe(result=>{
          this.contentService.add(content).subscribe(
            success => console.log(success),
            error => console.error(error)
          );
        });
      });

      this.router.navigateByUrl('');
    });

    // let contents : Content[] = [];
    // this.mediaContents.forEach(media =>{
    //   let fileExtension = media.name.split('.').pop();
    //   let content = new Content();
    //   content.linkContent = 'media' + (contents.length + 1) + fileExtension;
    //   content.type = 1;
    //   contents.push(content);

    //   this.uploadService.uploadImage(media,)
    // });

    // newPost.contents = contents;


    // if(this.imageTest)
    // this.uploadService.uploadImage(this.imageTest).subscribe(success=>console.log(success), error => console.error(error)
    // );
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.mediaContents.push(file);
    const wrapper = document.getElementById('image-wrapper');

    if (file) {
      let img = document.createElement('img');

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(file); // set src to blob url
      img.style.width = '30%';
      img.style.height = '15rem';
      img.style.objectFit = 'cover';


      wrapper?.appendChild(img);
      this.showCreatePost();
    }
  }

  showCreatePost(): void {
    const modal = document.querySelector('.posting') as HTMLElement;
    const textarea = document.querySelector('.posting .textarea') as HTMLTextAreaElement;

    modal.style.display = 'grid';
    textarea.focus();
  }

  initCreatePostEvent(): void {
    const input = document.querySelector('.create-post input') as HTMLInputElement;
    const modal = document.querySelector('.posting') as HTMLElement;

    input.addEventListener('click', () => this.showCreatePost());

    modal.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('posting')) {
        modal.style.display = 'none';
      }
    });
  }
}
