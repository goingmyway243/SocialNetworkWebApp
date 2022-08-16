import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Post } from '../models/post.model';
import { React } from '../models/react.model';

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

  getPostReacts(postId: string): Observable<React[]> {
    let apiGet = `${this.apiUrl}/${postId}`;
    return this.http.get<React[]>(apiGet);
  }
}
