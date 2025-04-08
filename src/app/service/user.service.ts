import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationResponse} from './Entity/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authResponse!: AuthenticationResponse;

  init() {
    const auth : string | null = localStorage.getItem('authResponse');
    if (auth != null) {
      this.authResponse = JSON.parse(auth);
    }
  }

  constructor(
    private http: HttpClient
  ) { this.init(); }

  login(username: string, password: string) {
    const body: any = {username, password};
    return this.http.post<AuthenticationResponse>("http://localhost:9080/user/login", body);
  }

  loggedin(authResponse: AuthenticationResponse): boolean {
    localStorage.setItem('authResponse', JSON.stringify(authResponse));
    this.authResponse = authResponse;
    return true;
  }

}
