import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/helpers/util';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  retypePassword: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService
      .add(this.user)
      .subscribe(
        data => console.log(data),
        error => console.log(error));
  }
}
