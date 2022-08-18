import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/helpers/util';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

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
        error => Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: Util.getHttpErrorMessage(error),
          showConfirmButton: false,
          timer: 1500
        }));
  }

  onLoginSuccess(userID: string): void {
    localStorage.setItem('authorizeToken', userID);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login successfully',
      showConfirmButton: false,
      timer: 1500
    }).then(result => {
      this.router.navigateByUrl('');
    });
  }
}
