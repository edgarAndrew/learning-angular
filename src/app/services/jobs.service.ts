import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable,BehaviorSubject,finalize } from 'rxjs';
import { Job } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiUrl = 'https://jobs-tracker-7o5a.onrender.com/api/v1/jobs'; 

  private loadingSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject to track loading state
  public loading$ = this.loadingSubject.asObservable(); // Expose as Observable

  constructor(private http: HttpClient,) {}

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  // Method to get all todos from the API
  getJobs(): Observable<any> {
    const token = localStorage.getItem('token');

    // Set the headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the Authorization header
    });
    this.setLoading(true);
    return this.http.get<any>(this.apiUrl,{headers}).pipe(finalize(() => this.setLoading(false)));
  }

  updateJob(id: string,company: string,position: string,status: string): Observable<any> {
    const token = localStorage.getItem('token');

    // Set the headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the Authorization header
    });

    this.setLoading(true);
    return this.http.patch(`${this.apiUrl}/${id}`, { company, position, status }, { headers }).pipe(finalize(() => this.setLoading(false)));
  }

  addJob(company: string,position: string): Observable<any> {
    const token = localStorage.getItem('token');

    // Set the headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the Authorization header
    });

    this.setLoading(true);
    return this.http.post(`${this.apiUrl}`, { company, position}, { headers }).pipe(finalize(() => this.setLoading(false)));
  }

  deleteJob(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    // Set the headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the Authorization header
    });

    this.setLoading(true);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(finalize(() => this.setLoading(false)));
  }
}
