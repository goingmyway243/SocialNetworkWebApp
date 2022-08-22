import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Chatroom } from '../models/chatroom.model';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Chatroom';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Chatroom[]> {
    return this.http.get<Chatroom[]>(this.apiUrl);
  }

  getById(id: string): Observable<Chatroom> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new Chatroom(), data)));
  }

  add(chatroom: Chatroom): Observable<string> {
    return this.http.post<string>(this.apiUrl, chatroom, AppComponent.httpOptions);
  }

  update(chatroom: Chatroom): Observable<string> {
    let putUrl = `${this.apiUrl}/${chatroom.id}`;
    return this.http.put<string>(putUrl, chatroom, AppComponent.httpOptions);
  }

  delete(id: string): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl);
  }
}
