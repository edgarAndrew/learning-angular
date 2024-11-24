import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
import { Job } from '../../models/Job';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,LoaderComponent,NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  username: string = '';
  jobs: Job[] = [];

  constructor(private userDataService: UserDataService,private jobsService: JobsService,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userDataService.isUserAuthenticated() && !this.userDataService.tokenExists()) {
      this.router.navigate(['/login']);
    }

    if(this.userDataService.isUserAuthenticated()) {
      this.username = this.userDataService.getUsername()
      this.loadJobs();
      return;
    };

    firstValueFrom(this.authService.loadUser())
      .then((response) => {
        // console.log('Load successful', response);
        this.userDataService.setUsername(response.username);
        this.username = this.userDataService.getUsername();
        this.userDataService.setUserId(response.userId);
        this.userDataService.setUserAuthenticated(true);
        this.loadJobs();
      })
      .catch((error) => {
        console.error('Load user failed : ', error);
        this.userDataService.setUserAuthenticated(false);
        this.router.navigate(['/login']);
      });
  }

  loadJobs(): void {
    firstValueFrom(this.jobsService.getJobs())
        .then((response) => {
          // console.log('Get jobs successful');
          this.jobs = response.jobs;
        })
        .catch((error) => {
          console.error('Failed to get jobs', error);
          this.userDataService.setUserAuthenticated(false);
          this.router.navigate(['/login']);
        });
  }

  editJob(id: string, company: string, position: string,status: string): void {
    this.router.navigate(['/jobs/edit', id], {
      queryParams: { status,company,position }
    });
  }

  deleteJob(id: string): void {
    firstValueFrom(this.jobsService.deleteJob(id))
      .then(() => {
        alert('Job deleted successfully');
        this.loadJobs();
      })
      .catch((error) => {
        console.error('Failed to delete job', error);
      });
  }

  logout(): void {
    this.userDataService.clearUserData();
    this.router.navigate(['/login']);
  }

  addJob(): void {
    this.router.navigate(['/jobs/add']);
  }
}
