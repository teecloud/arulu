import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.api.login(this.username, this.password).subscribe({
      next: (user) => {
        this.api.setCurrentUser(user);
        // Navigate to home after login
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}