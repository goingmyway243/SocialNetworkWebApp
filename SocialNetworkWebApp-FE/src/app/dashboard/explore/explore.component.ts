import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  currentUser: User = new User();
  post: string = '';
  images: string[] = new Array();

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initElementsClickEvent();
    this.getCurrentUser();
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

  showSettings(show: boolean): void {
    console.log(true);

    const tabHome = document.querySelector('.tab-home') as HTMLElement;
    const tabSettings = document.querySelector('.tab-settings') as HTMLElement;

    tabHome.style.display = !show ? 'block' : 'none';
    tabSettings.style.display = show ? 'block' : 'none';
  }

  showCreatePost(): void {
    const modal = document.querySelector('.posting') as HTMLElement;
    const textarea = document.querySelector('.posting .textarea') as HTMLTextAreaElement;

    modal.style.display = 'grid';
    textarea.focus();
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }

  initElementsClickEvent(): void {
    this.initCreatePostEvent();
    this.initSearchMessageEvent();
    // this.initCategoriesClickEvent();
  }

  initCategoriesClickEvent(): void {
    const categories = document.querySelectorAll('.category h6');

    const removeActiveCategoryClass = () => {
      categories.forEach(item => {
        item.classList.remove('active');
      });
    };

    categories.forEach(item => {
      item.addEventListener('click', () => {
        removeActiveCategoryClass();
        item.classList.add('active');
      });
    });
  }

  initCreatePostEvent(): void {
    const input = document.querySelector('.create-post input') as HTMLInputElement;
    const modal = document.querySelector('.posting') as HTMLElement;
    const textarea = document.querySelector('.posting .textarea') as HTMLTextAreaElement;

    input.addEventListener('click', () => this.showCreatePost());

    modal.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('posting')) {
        modal.style.display = 'none';
        this.post = textarea.innerHTML;
      }
    });
  }

  initSearchMessageEvent(): void {
    const listMessage = document.querySelectorAll('.message');
    const messageSearch = document.getElementById('message-search') as HTMLInputElement;

    messageSearch?.addEventListener('input', () => {
      const keyword = messageSearch.value.toLowerCase();
      listMessage.forEach(chat => {
        let name = chat.querySelector('h5')?.textContent?.toLowerCase();
        const match = name && name.indexOf(keyword) != -1;
        (chat as HTMLElement).style.display = match ? 'flex' : 'none';
      })
    });
  }
}
