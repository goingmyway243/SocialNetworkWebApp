import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Content-Type': 'application/json'
    })
  };

  private apiUrl: string = AppComponent.baseUrl + 'api/User';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: string): Observable<User> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<User>(getUrl);
  }

  add(user: User): Observable<string> {
    return this.http.post<string>(this.apiUrl, user, this.httpOptions);
  }

  update(user: User): Observable<string> {
    let putUrl = `${this.apiUrl}/${user.id}`;
    return this.http.put<string>(putUrl, user, this.httpOptions);
  }

  delete(id: string): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, this.httpOptions);
  }
}
