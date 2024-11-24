import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient for API calls
import { finalize, Observable,BehaviorSubject } from 'rxjs'; // Import Observable for handling API responses

@Injectable({
  providedIn: 'root' // Makes the service globally available
})
export class AuthService {
  private apiUrl = 'https://jobs-tracker-7o5a.onrender.com/api/v1/auth'; // Replace with your actual API URL
  
  private loadingSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject to track loading state
  public loading$ = this.loadingSubject.asObservable(); // Expose as Observable

  // To subscribe to a variable, it should be passed as an argument to the Observable
  
  constructor(private http: HttpClient) {}

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  // Function to register a new user
  registerUser(userData: any): Observable<any> {
    this.setLoading(true);
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(finalize(() => this.setLoading(false))); // API endpoint for registration
  }

  // The finalize operator is a lifecycle operator in RxJS. It allows you to execute logic when an observable completes or terminates
  // The pipe() method allows you to chain multiple RxJS operators in a readable and functional manner.

  // Function to log in a user
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    this.setLoading(true);
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(finalize(() => this.setLoading(false))); // API endpoint for login
  }

  // Function to load a user
  loadUser(): Observable<any> {
    this.setLoading(true);
    return this.http.get(`${this.apiUrl}/load`,
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
      .pipe(finalize(() => this.setLoading(false)));
  }
  
}