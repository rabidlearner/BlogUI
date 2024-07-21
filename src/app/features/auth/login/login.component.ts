import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from './models/login-model.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    };
  }
  
  onFormSubmit() : void {
    var lo = this.authService.login(this.model).subscribe({
      next: (response) => {
        //Set Auth Cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');

        // set user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        //Redirect back to Home
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy(): void {
    
  }


}
