import { Component,signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Toaster } from '../../services/toaster';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: Auth, private router: Router,private toaster: Toaster) {}

  userName:string='';
   email: string = '';
  password: string = '';
  errorMessage: string = '';

   onLogin() {
    debugger; 
  this.errorMessage = '';

  if (!this.email || !this.password) {
    this.toaster.showError('Please enter both email and password.');
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      if (res.isFirstLogin === true) {
        this.authService.setSession(res.token, res.userName || '');
        localStorage.setItem('UserId', res.userId.toString());
        this.toaster.showInfo('Welcome! Please reset your password.');
        this.router.navigate(['/reset-password']);
        return;
      }

      if (res.token) {
        this.authService.setSession(res.token, res.userName || '');
        localStorage.setItem('UserId', res.userId.toString());
        this.router.navigate(['/home']);

        this.toaster.showSuccess('Login successful!');
      } else {
        this.toaster.showError('Unexpected error. Please try again.');
      }
    },
    error: (err) => {
      if (err.status === 401) {
        this.toaster.showError('Invalid email or password.');
      } else if (err.status === 403) {
        this.errorMessage = 'Your account is inactive. Please contact admin.';
      } else {
        this.toaster.showError('Something went wrong.');
      }
    }
  });
}

}
  