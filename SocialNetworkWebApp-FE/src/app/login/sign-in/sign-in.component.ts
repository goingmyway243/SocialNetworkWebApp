import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/helpers/util';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user?: User;
  email: string = '';
  password: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService
      .login(this.email, this.password)
      .subscribe(
        data => alert('Đăng nhập thành công!'),
        error => alert(Util.getHttpErrorMessage(error)));
  }
}
