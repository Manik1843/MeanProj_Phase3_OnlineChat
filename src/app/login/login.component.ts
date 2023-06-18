import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    // Perform authentication logic by calling the login API
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://192.168.1.3:3000/login', loginData)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        
         //manual navigation or navigation through code
          this.router.navigate(['/chat-rooms']);
        },
        (error) => {
          console.error('Error logging in:', error);
          // Handle login error (e.g., display error message)
        }
      );
  }
}
