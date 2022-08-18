import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() showCreatePost: boolean = false;
  @Input() currentUser: User = new User();
  @Output() onSettingClick: EventEmitter<number> = new EventEmitter();
  @Output() onCreatePostClick: EventEmitter<void> = new EventEmitter();

  root: HTMLElement = document.querySelector(':root') as HTMLElement;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initMenuItemsClickEvent();

    this.initThemeCustomization();
    this.initFontSizeCustomization();
    this.initColorCustomization();
    this.initBackgroundCustomization();
  }

  navigateToWall(): void {
    this.router.navigateByUrl('/home/wall');
  }

  showTab(tabIndex: number): void {
    this.onSettingClick.emit(tabIndex);
  }

  createPost(): void {
    this.onCreatePostClick.emit();

    const menuItem = document.querySelector('.menu-item.active') as HTMLElement;
    if (menuItem.id !== 'home') {
      const menuItemHome = document.querySelector('.menu-item#home') as HTMLElement;
      menuItemHome.click();
    }
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
        if (item.id === 'home' && item.classList.contains('active')) {
          location.reload();
        }

        changeActiveItem();
        item.classList.add('active');
      });
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
