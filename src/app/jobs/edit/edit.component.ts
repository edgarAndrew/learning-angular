import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';
import { CommonModule,NgIf } from '@angular/common';
import { JobsService } from '../../services/jobs.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,LoaderComponent,CommonModule,NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  job = {
    id: '',
    company: '',
    position:'',
    status: ''
  };

  constructor(private route: ActivatedRoute, private jobsService: JobsService,private router: Router) {}

  ngOnInit(): void {
    this.job.id = this.route.snapshot.paramMap.get('id') || '';

     // Get query parameters
     this.route.queryParams.subscribe((params) => {
      this.job.status = params['status'];
      this.job.company = params['company'];
      this.job.position = params['position'];
    });
  }

  onSubmit() {
    if (this.job.company && this.job.position && this.job.status) {
      firstValueFrom(this.jobsService.updateJob(this.job.id, this.job.company, this.job.position, this.job.status))
        .then((response) => {
          // console.log('Job updated successfully', response);
          alert('Job updated successfully');
          this.router.navigate(['/jobs']);

        })
        .catch((error) => {
          console.error('Failed to update job', error);
        });
    }
  }
}
