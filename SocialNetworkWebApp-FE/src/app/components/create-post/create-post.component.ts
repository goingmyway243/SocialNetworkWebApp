import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() currentUser: User = new User();

  caption: string = '';

  constructor(private router: Router,
    private postService: PostService) { }

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

    this.postService.add(newPost).subscribe(_ => this.router.navigateByUrl(''));
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
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