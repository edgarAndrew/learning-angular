import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { JobsService } from '../../services/jobs.service';
import { OnInit } from '@angular/core';
import { Job } from '../../models/Job';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  username: string = '';
  jobs: Job[] = [];

  constructor(private userDataService: UserDataService,private jobsService: JobsService) {}

  ngOnInit(): void {
    // Get the username from the service
    this.username = this.userDataService.getUsername();
    firstValueFrom(this.jobsService.getJobs())
      .then((response) => {
        this.jobs = response;
        console.log(this.jobs)
      })
      .catch((error) => {
        console.error('Failed to get jobs', error);
      });
    
  }
}
