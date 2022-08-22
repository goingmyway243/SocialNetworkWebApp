import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Friendship } from 'src/app/models/friendship.model';
import { User } from 'src/app/models/user.model';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() friendshipData!: Friendship;

  user: User = new User();
  response: string = '';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private friendshipService: FriendshipService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getById(this.friendshipData.userId).subscribe(data => this.user = data);
  }

  accept(): void {
    this.friendshipData.status = 1;
    this.friendshipService.update(this.friendshipData).subscribe(_ => this.showResponse('accepted'));
  }

  decline(): void {
    this.friendshipService.delete(this.friendshipData.id).subscribe(_ => this.showResponse('declined'));
  }

  showResponse(result: string): void {
    const buttons = this.elementRef.nativeElement.querySelector('.action') as HTMLElement;
    const responseElm = this.elementRef.nativeElement.querySelector('.response') as HTMLElement;

    buttons.style.display = 'none';
    responseElm.style.display = 'block';

    this.response = result;
  }

  navigateToWall(): void {
    this.router.navigateByUrl(`home/wall/${this.friendshipData.userId}`);
  }
}
