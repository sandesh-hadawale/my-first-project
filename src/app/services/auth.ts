import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DataTypes/login-response';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
   private apiUrl = 'https://yourapi.com/login'; // Replace with your backend API

  constructor(private http: HttpClient,private router: Router) { }

  private baseUrl = 'https://localhost:7289/api/LoginAPI';
   
  private tokenTimer: any;
  setSession(token: string, userName: string): void {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userName', userName);
    this.startTokenTimer(token);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Login`, {
      Username: username,
      Password: password,
      IsFirstLogin: Boolean
    });
  }
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
  

  private startTokenTimer(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      const timeout = expiresAt - Date.now();

      if (timeout > 0) {
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, timeout);
      } else {
        this.logout();
      }
    } catch {
      this.logout();
    }
  }
  
  autoLogin(): void {
    const token = this.getToken();
    if (!token) return;

    if (this.isLoggedIn()) {
      this.startTokenTimer(token);
    } else {
      this.logout();
    }
  }
}
