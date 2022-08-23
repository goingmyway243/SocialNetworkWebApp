import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Chatroom } from '../models/chatroom.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Chatting';

  constructor(private http: HttpClient) { }

  getChatroomByUserAndFriend(user: User, friend: User): Observable<Chatroom> {
    return this.http.post(this.apiUrl, { user: user, friend: friend }, AppComponent.httpOptions)
      .pipe(map(data => Object.assign(new Chatroom(), data)));
  }
}
