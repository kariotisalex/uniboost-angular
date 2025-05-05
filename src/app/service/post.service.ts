import {Injectable} from '@angular/core';
import {PostResponseContainerDto} from './models/post-response';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostDetailsResponseDto} from './models/post-details-response-dto';
import {PostResponseOwnerDto} from './models/post-response-owner-dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponseContainerDto> {
    return this.http.get<PostResponseContainerDto>("/api/post/feed");
  }

  // getPostsByPage(page: number): Observable<PostResponseContainerDto> {
  //   return this.http.get<PostResponseContainerDto>(`/api/post/feed?page=${page}`);
  // }
  getPostsByPage(page: number, search:string): Observable<PostResponseContainerDto> {
    return this.http.get<PostResponseContainerDto>(`/api/post/feed?page=${page}&search=${search}`);
  }


  addPost(body: {
    maxEnrolls: number | null;
    previewDescription: string;
    description: string;
    isPersonal: boolean;
    place: string;
    title: string
  }): Observable<string> {
    return this.http.post<string>('/api/post', body);
  }

  getPostDetails(id: string): Observable<PostDetailsResponseDto> {
    return this.http.get<PostDetailsResponseDto>(`/api/post/${id}`);
  }

  enroll(id: string) {
    return this.http.post<PostDetailsResponseDto>(`/api/post/enroll/${id}`, {})
  }

  disenroll(id: string) {
    return this.http.delete<PostDetailsResponseDto>(`/api/post/disenroll/${id}`, {})
  }

  getEnrolledCourses(page: number, pageSize: number) {
    return this.http.get<PostResponseContainerDto>(`/api/post/enrolledposts?page=${page}&size=${pageSize}`);

  }

  getMyPosts(page: number, pageSize: number) {
    return this.http.get<PostResponseContainerDto>(`/api/post/myposts?page=${page}&size=${pageSize}`);
  }

  getMyPostDetails(id: string): Observable<PostResponseOwnerDto> {
    return this.http.get<PostResponseOwnerDto>(`/api/post/mypost/${id}`);
  }

  removeStudent(userId: string, postId: string): Observable<void> {
    return this.http.delete<void>(`/api/post/disenroll/${userId}/${postId}`);
  }

  updatePost(course: PostResponseOwnerDto) {
    const body = {
      "id": course.id,
      "previewDescription": course.previewDescription,
      "description": course.description,
      "isPersonal": course.isPersonal,
      "place": course.place,
      "maxEnrolls": course.maxEnrolls
    }

    return this.http.put<PostResponseOwnerDto>(`/api/post`, body)
  }

  delete(courseId: string) {
    return this.http.delete(`/api/post/${courseId}`);
  }
}
