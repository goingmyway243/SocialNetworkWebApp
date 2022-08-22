import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Message';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  getById(id: string): Observable<Message> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new Message(), data)));
  }

  add(message: Message): Observable<string> {
    return this.http.post<string>(this.apiUrl, message, AppComponent.httpOptions);
  }

  update(message: Message): Observable<string> {
    let putUrl = `${this.apiUrl}/${message.id}`;
    return this.http.put<string>(putUrl, message, AppComponent.httpOptions);
  }

  delete(id: string): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl);
  }
}
