import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import { React } from '../models/react.model';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  private apiUrl: string = AppComponent.baseUrl + 'api/NewsFeed';

  constructor(private http: HttpClient) { }

  getUserFeeds(userId: string, paging: number, myPostOnly: boolean): Observable<Post[]> {
    return this.http.post<Post[]>(
      this.apiUrl,
      { userId: userId, paging: paging, postedByUserOnly: myPostOnly },
      AppComponent.httpOptions);
  }

  getPostReacts(postId: string): Observable<React[]> {
    let apiGet = `${this.apiUrl}/${postId}`;
    return this.http.get<React[]>(apiGet);
  }

  getPostComments(postId: string, paging: number): Observable<Comment[]> {
    let apiPost = `${this.apiUrl}/${postId}`;
    return this.http.post<Comment[]>(apiPost, { postId: postId, paging: paging }, AppComponent.httpOptions);
  }
}
