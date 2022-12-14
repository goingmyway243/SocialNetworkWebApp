import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {
  private apiUrl: string = AppComponent.baseUrl + 'api/AdditionalInfomation';

  constructor(private http: HttpClient) { }

  getTotalComments(postId: string): Observable<number> {
    let apiGet = `${this.apiUrl}/${postId}`;
    return this.http.get<number>(apiGet);
  }

  getSharePost(postId: string): Observable<Post> {
    let apiPost = `${this.apiUrl}/${postId}`;
    return this.http.post<Post>(apiPost, postId, AppComponent.httpOptions);
  }
}
