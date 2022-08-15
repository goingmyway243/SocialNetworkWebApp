import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  private apiUrl: string = AppComponent.baseUrl + 'api/NewsFeed';

  constructor(private http: HttpClient) { }

  getUserFeeds(userId: string, myPostOnly: boolean): Observable<Post[]> {
    return this.http.post<Post[]>(
      this.apiUrl,
      { userId: userId, postedByUserOnly: myPostOnly },
      AppComponent.httpOptions);
  }
}
