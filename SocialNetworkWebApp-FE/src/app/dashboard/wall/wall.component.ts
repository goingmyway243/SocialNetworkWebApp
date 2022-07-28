import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public posts: any;

  public currentUserProfile: any;

  displayDate(date: Date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date(date);
    const monthName = months[d.getMonth()];
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return monthName + ' ' + day;
  }

  editProfile() {
    // this.dialog.open(EditprofileComponent);
  }

  displayModal(event: any) {
    event.stopPropagation();
    const wpContainer = document.querySelector('.wp-container');
    // wpContainer.classList.remove('hidden');
    // document.querySelector('body').style.overflowY = 'hidden';
  }

  closeModal(event: any) {
    if (!event.target.closest('.wp-child')) {
      const wpContainer = document.querySelector('.wp-container');
      // wpContainer.classList.add('hidden');
      // document.querySelector('body').style.overflowY = 'inherit';
    }
  }
}
