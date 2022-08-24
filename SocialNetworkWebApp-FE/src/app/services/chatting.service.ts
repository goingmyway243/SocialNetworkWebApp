import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Chatroom } from '../models/chatroom.model';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Chatting';

  constructor(private http: HttpClient) { }

  getAllChatroomsByUserId(userId: string): Observable<Chatroom[]> {
    let apiGet = `${this.apiUrl}/${userId}`;
    return this.http.get<Chatroom[]>(apiGet);
  }

  getChatroomByUserAndFriend(user: User, friend: User): Observable<Chatroom> {
    return this.http.post(this.apiUrl, { user: user, friend: friend }, AppComponent.httpOptions)
      .pipe(map(data => Object.assign(new Chatroom(), data)));
  }

  getMessageByChatroomId(chatroomId: string, getLast: boolean): Observable<Message[]> {
    let apiPost = `${this.apiUrl}/${chatroomId}`;
    return this.http.post<Message[]>(apiPost, { chatroomId: chatroomId, getLatest: getLast }, AppComponent.httpOptions);
  }
}
