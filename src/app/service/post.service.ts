import {Injectable} from '@angular/core';
import {PostResponseContainerDto} from './models/post-response';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostDetailsResponseDto} from './models/post-details-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponseContainerDto> {
    return this.http.get<PostResponseContainerDto>("/api/post/feed");
  }

  getPostsByPage(page: number): Observable<PostResponseContainerDto> {
    return this.http.get<PostResponseContainerDto>("/api/post/feed?page=" + page);
  }


  addPost(body: {
    maxEnrolls: number | null;
    previewDescription: string;
    description: string;
    isPersonal: boolean;
    place: string;
    title: string
  }): Observable<unknown> {
    return this.http.post('/api/post', body);

  }

  getPostDetails(id: string): Observable<PostDetailsResponseDto> {
    return this.http.get<PostDetailsResponseDto>(`/api/post/${id}`);
  }
}
