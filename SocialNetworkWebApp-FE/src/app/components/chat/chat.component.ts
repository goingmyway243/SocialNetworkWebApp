import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatUser!: User;

  constructor(
    private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  close(): void {
    const popup = this.elementRef.nativeElement.querySelector('.chat');
    popup.style.display = 'none';
  }
}
