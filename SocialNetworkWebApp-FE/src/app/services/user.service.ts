import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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

  private apiUrl: string = 'https://localhost:5001/api/User';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: string): Observable<User> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<User>(getUrl);
  }

  add(student: User): Observable<string> {
    return this.http.post<string>(this.apiUrl, student, this.httpOptions);
  }

  update(student: User): Observable<string> {
    let putUrl = `${this.apiUrl}/${student.id}`;
    return this.http.put<string>(putUrl, student, this.httpOptions);
  }

  delete(id: string): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, this.httpOptions);
  }
}
