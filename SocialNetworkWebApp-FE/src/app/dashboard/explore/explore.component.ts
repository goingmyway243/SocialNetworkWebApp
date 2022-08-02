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
  root: HTMLElement = document.querySelector(':root') as HTMLElement;

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

    this.initMenuItemsClickEvent();
    // this.initCategoriesClickEvent();

    this.initThemeCustomization();
    this.initFontSizeCustomization();
    this.initColorCustomization();
    this.initBackgroundCustomization();
  }

  initMenuItemsClickEvent(): void {
    const menuItems = document.querySelectorAll('.menu-item');

    const changeActiveItem = () => {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
    };

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (item.id == 'home' && item.classList.contains('active')) {
          location.reload();
        }

        changeActiveItem();
        item.classList.add('active');
      });
    });
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

  initThemeCustomization(): void {
    const homeBtn = document.getElementById('home');
    const themeBtn = document.getElementById('theme');
    const themeModal = document.querySelector('.customize-theme') as HTMLElement;

    themeBtn?.addEventListener('click', () => {
      themeModal.style.display = 'grid';
    });

    themeModal.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
        homeBtn?.click();
      }
    })
  }

  initFontSizeCustomization(): void {
    const listFontSizes = document.querySelectorAll('.choose-size span');
    const removeActiveSizeClass = () => {
      listFontSizes.forEach(size => {
        size.classList.remove('active');
      });
    };

    listFontSizes.forEach(size => {
      size.addEventListener('click', () => {
        let fontSize = '';
        removeActiveSizeClass();
        size.classList.add('active');

        if (size.classList.contains('font-size-1')) {
          fontSize = '10px';
          this.root.style.setProperty('--sticky-top-left', '5.4rem');
          this.root.style.setProperty('--sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
          fontSize = '13px';
          this.root.style.setProperty('--sticky-top-left', '5.4rem');
          this.root.style.setProperty('--sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
          fontSize = '16px';
          this.root.style.setProperty('--sticky-top-left', '5.4rem');
          this.root.style.setProperty('--sticky-top-right', '-18rem');
        } else if (size.classList.contains('font-size-4')) {
          fontSize = '19px';
          this.root.style.setProperty('--sticky-top-left', '5.4rem');
          this.root.style.setProperty('--sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
          fontSize = '22px';
          this.root.style.setProperty('--sticky-top-left', '5.4rem');
          this.root.style.setProperty('--sticky-top-right', '-35rem');
        }

        (document.querySelector('html') as HTMLElement).style.fontSize = fontSize;
      });
    });
  }

  initColorCustomization(): void {
    const colorPalette = document.querySelectorAll('.choose-color span');

    const removecActiveColorClass = () => {
      colorPalette.forEach(color => {
        color.classList.remove('active');
      });
    };

    colorPalette.forEach(color => {
      color.addEventListener('click', () => {
        let primaryHue: string = '252';
        removecActiveColorClass();
        color.classList.add('active');

        if (color.classList.contains('color-1')) {
          primaryHue = '252';
        } else if (color.classList.contains('color-2')) {
          primaryHue = '52';
        } else if (color.classList.contains('color-3')) {
          primaryHue = '352';
        } else if (color.classList.contains('color-4')) {
          primaryHue = '152';
        } else if (color.classList.contains('color-5')) {
          primaryHue = '202';
        }

        this.root.style.setProperty('--primary-color-hue', primaryHue);
      });
    });
  }

  initBackgroundCustomization(): void {
    const bg1 = document.querySelector('.bg-1') as HTMLElement;
    const bg2 = document.querySelector('.bg-2') as HTMLElement;
    const bg3 = document.querySelector('.bg-3') as HTMLElement;

    let lightColorLightness: string = '';
    let whiteColorLightness: string = '';
    let darkColorLightness: string = '';

    const changeBG = () => {
      this.root.style.setProperty('--light-color-lightness', lightColorLightness);
      this.root.style.setProperty('--white-color-lightness', whiteColorLightness);
      this.root.style.setProperty('--dark-color-lightness', darkColorLightness);
    }

    bg1.addEventListener('click', () => {
      darkColorLightness = '17%';
      whiteColorLightness = '100%';
      lightColorLightness = '95%';

      bg1.classList.add('active');

      bg2.classList.remove('active');
      bg3.classList.remove('active');
      changeBG();
    });

    bg2.addEventListener('click', () => {
      darkColorLightness = '95%';
      whiteColorLightness = '20%';
      lightColorLightness = '15%';

      bg2.classList.add('active');

      bg1.classList.remove('active');
      bg3.classList.remove('active');
      changeBG();
    });

    bg3.addEventListener('click', () => {
      darkColorLightness = '95%';
      whiteColorLightness = '10%';
      lightColorLightness = '0%';

      bg3.classList.add('active');

      bg2.classList.remove('active');
      bg1.classList.remove('active');
      changeBG();
    });
  }
}
