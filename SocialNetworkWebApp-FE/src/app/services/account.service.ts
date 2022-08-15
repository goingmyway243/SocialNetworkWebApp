import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Account';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { Email: email, Password: password }, AppComponent.httpOptions);
  }

  generateDefaultAvatar(userId: string): Observable<boolean> {
    let postUrl = `${this.apiUrl}/${userId}`;
    return this.http.post<boolean>(postUrl, AppComponent.httpOptions);
  }
}
