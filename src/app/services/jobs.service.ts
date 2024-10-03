import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiUrl = 'https://jobs-tracker-7o5a.onrender.com/api/v1/jobs'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get all todos from the API
  getJobs(): Observable<Job[]> {
    const token = localStorage.getItem('token');

    // Set the headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the Authorization header
    });
    return this.http.get<Job[]>(this.apiUrl,{headers});
  }
}
