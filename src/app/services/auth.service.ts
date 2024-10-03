import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Observable } from 'rxjs'; // Import Observable for handling API responses

@Injectable({
  providedIn: 'root' // Makes the service globally available
})
export class AuthService {
  private apiUrl = 'https://jobs-tracker-7o5a.onrender.com/api/v1/auth'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Function to register a new user
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData); // API endpoint for registration
  }

  // Function to log in a user
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData); // API endpoint for login
  }

  // You can add more methods here, like for logging out, refreshing tokens, etc.
}
