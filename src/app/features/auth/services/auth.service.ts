import { Injectable } from '@angular/core';
import { LoginRequest } from '../login/models/login-model.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../login/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void{
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }
}
