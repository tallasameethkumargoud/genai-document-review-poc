import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:8080/api/auth/login',
      { username, password }
    );
  }

  logout(): void {
    // Clear the authentication token from local storage or session storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if the authentication token exists in local storage or session storage
    return !!localStorage.getItem('token');
  }
}