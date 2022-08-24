import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Util } from 'src/app/helpers/util';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  retypePassword: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private accountService: AccountService) { }

  ngOnInit(): void {
  }

  async register(): Promise<void> {
    let check = await this.validate();

    if (check) {
      this.userService
        .add(this.user)
        .subscribe(
          data => {
            this.accountService.generateDefaultAvatar(data).subscribe();

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Create account successfully!',
              showConfirmButton: false,
              timer: 1500
            }).then(result => {
              this.router.navigateByUrl('');
            });
          },
          error => console.log(error));
    }
  }

  async validate(): Promise<boolean> {
    let check = true;
    let message = '';
    const userRepo = await lastValueFrom(this.userService.getAll());

    if (!this.user.email ||
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.phone ||
      !this.user.password) {
      check = false;
      message = 'Please fulfill all informations';
    } else if (this.user.password !== this.retypePassword) {
      check = false;
      message = 'Retype the password incorrectly!';
    }

    userRepo.forEach(user => {
      if (user.email === this.user.email) {
        check = false;
        message = 'Email already used!';
      }
    });

    if (!check) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
    }

    return check;
  }
}
