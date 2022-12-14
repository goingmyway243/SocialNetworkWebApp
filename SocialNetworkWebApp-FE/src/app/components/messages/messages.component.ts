import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() totalRequests: number = 0;
  @Input() currentUser!: User;
  @Input() chatrooms: Chatroom[] = [];

  @Output() onChatroomSelect: EventEmitter<Chatroom> = new EventEmitter();

  searchKeyword: string = '';

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initCategoriesClickEvent();
  }

  chatroomSelect(chatroom: Chatroom): void {
    this.onChatroomSelect.emit(chatroom);
  }

  initSearchMessageEvent(): void {
    const listMessage = document.querySelectorAll('.message');
    const messageSearch = this.elementRef.nativeElement.querySelector('.search-bar #message-search') as HTMLInputElement;

    messageSearch.addEventListener('input', () => {
      const keyword = messageSearch.value.toLowerCase();
      listMessage.forEach(chat => {
        let name = chat.querySelector('h5')?.textContent?.toLowerCase();
        const match = name && name.indexOf(keyword) != -1;
        (chat as HTMLElement).style.display = match ? 'flex' : 'none';
      })
    });
  }

  initCategoriesClickEvent(): void {
    const categories = document.querySelectorAll('.category h6');
    const listMessages = document.querySelector('.list-messages') as HTMLElement;

    const removeActiveCategoryClass = () => {
      categories.forEach(item => {
        item.classList.remove('active');
      });
    };

    categories.forEach(item => {
      item.addEventListener('click', () => {
        removeActiveCategoryClass();
        item.classList.add('active');
        listMessages.style.display = item.id === 'requests' ? 'none' : 'block';
      });
    });
  }
}
