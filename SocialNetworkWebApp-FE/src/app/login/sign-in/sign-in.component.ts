import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/helpers/util';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User();

  constructor(
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService
      .login(this.user.email, this.user.password)
      .subscribe(
        data => this.onLoginSuccess(data),
        error => alert(Util.getHttpErrorMessage(error)));
  }

  onLoginSuccess(userID: string): void {
    localStorage.setItem('authorizeToken', userID);
    alert('Login successfully!');
    this.router.navigateByUrl('');
  }
}
