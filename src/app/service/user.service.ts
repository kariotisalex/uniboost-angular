import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationResponse} from './models/authentication-response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authResponse!: AuthenticationResponse;


  init() {
    const access_token : string | null = sessionStorage.getItem('access_token');
    const refresh_token: string | null = sessionStorage.getItem('refresh_token');

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
    sessionStorage.setItem('access_token', authResponse.access_token);
    sessionStorage.setItem('refresh_token', authResponse.refresh_token);
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
        sessionStorage.clear();
        this.authResponse = { access_token: '', refresh_token: '' };
        this.router.navigate(['login']);
      }
    });

  }


}
