import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initElementsClickEvent();
  }

  initElementsClickEvent(): void {
    this.initMenuItemsClickEvent();
    this.initSearchMessageEvent();
    this.initThemeCustomization();
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
        changeActiveItem();
        item.classList.add('active');
      });
    });
  }

  initSearchMessageEvent(): void {
    const listMessage = document.querySelectorAll('.message');
    const messageSearch = document.getElementById('message-search') as HTMLInputElement;

    messageSearch?.addEventListener('keyup', () => {
      const keyword = messageSearch.value.toLowerCase();
      listMessage.forEach(chat => {
        let name = chat.querySelector('h5')?.textContent?.toLowerCase();
        const match = name && name.indexOf(keyword) != -1;
        (chat as HTMLElement).style.display = match ? 'flex' : 'none';
      })
    });
  }

  initThemeCustomization(): void {
    const themeBtn = document.getElementById('theme');
    const themeModal = document.querySelector('.customize-theme') as HTMLElement;

    themeBtn?.addEventListener('click', () => {
      themeModal.style.display = 'grid';
    });

    themeModal.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
      }
    })
  }
}
