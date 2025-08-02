import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  register(): void {
    this.errorMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.api.register(this.username, this.password).subscribe({
      next: (user) => {
        this.api.setCurrentUser(user);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Username already exists.';
        } else {
          this.errorMessage = 'Registration failed.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}