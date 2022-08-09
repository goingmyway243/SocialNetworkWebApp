import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl: string = AppComponent.baseUrl + 'api/Upload';

  constructor(private http: HttpClient) { }

  uploadImage(file: File, fileName:string, folderName?: string): Observable<string> {
    let postUrl = folderName ? `${this.apiUrl}/${folderName}` : this.apiUrl;

    let formData = new FormData();
    formData.append("Image",file,fileName);

    return this.http.post<string>(postUrl, formData);
  }
}
