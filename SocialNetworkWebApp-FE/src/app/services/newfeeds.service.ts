import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class NewfeedsService {
  private apiUrl: string = AppComponent.baseUrl + 'api/NewFeeds';

  constructor(private http: HttpClient) { }

  getUserFeeds(userId: string): Observable<Post[]> {
    let getUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<Post[]>(getUrl);
  }
}
