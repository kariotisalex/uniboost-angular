import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationResponse} from './models/authentication-response';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserPostResponseDto} from './models/user-post-response-dto';
import {UserInfoRequestDto} from './models/user-info-request-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authResponse!: AuthenticationResponse;


  init() {
    const access_token : string | null = localStorage.getItem('access_token');
    const refresh_token: string | null = localStorage.getItem('refresh_token');

    if (access_token != null && refresh_token != null) {
      this.authResponse = {
        access_token: access_token,
        refresh_token: refresh_token
      }
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { this.init(); }

  login(username: string, password: string) {
    const body: any = {username, password};
    return this.http.post<AuthenticationResponse>("/api/user/login", body);
  }

  loggedin(authResponse: AuthenticationResponse): boolean {
    localStorage.setItem('access_token', authResponse.access_token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
    this.authResponse = authResponse;
    return true;
  }

  register(username: string,
           password: string,
           firstName: string,
           lastName: string,
           email: string,
           phone: string ) {
    const body : any = {username, password, firstName, lastName, email, phone};
    return this.http.post<AuthenticationResponse>("http://localhost:9080/user/register", body);
  }

  logout() {
    this.http.get('/api/user/logout').subscribe({
      next: authResponse => {
        localStorage.clear();
        this.authResponse = { access_token: '', refresh_token: '' };
        this.router.navigate(['login']);
      }
    });
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>('/api/user');
  }
  getUserInfo(): Observable<UserPostResponseDto> {
    return this.http.get<UserPostResponseDto>(`/api/user/userinfo`);
  }


  updateUserInfo(editedUser: UserInfoRequestDto): Observable<UserPostResponseDto> {
    return this.http.put<UserPostResponseDto>(`/api/user/userinfo`,editedUser);
  }

  updateUserEmail(email: string): Observable<UserPostResponseDto> {
    const body = {"email": email};
    return this.http.put<UserPostResponseDto>(`/api/user/email`, body);
  }

  updateUserUsername(username: string): Observable<UserPostResponseDto> {
    const body={"newUsername": username}

    return this.http.put<UserPostResponseDto>(`/api/user/username`, body);
  }

  sendResetLink(username: string): Observable<any> {
    return this.http.post(`/api/user/forgot-password?username=${username}`, {});
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`/api/user/reset-password?token=${token}`, { password });
  }

}
