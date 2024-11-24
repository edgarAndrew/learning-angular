import { Component } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoaderComponent } from '../../loader/loader.component';
import { CommonModule,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,LoaderComponent,CommonModule,NgIf],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  job = {
    company: '',
    position:''
  };

  constructor(private jobsService: JobsService, private router: Router) {}

  onSubmit() {
    if (this.job.company && this.job.position) {
      firstValueFrom(this.jobsService.addJob(this.job.company, this.job.position))
        .then((response) => {
          alert('Job added successfully');
          // console.log('Job added successfully', response);
          this.router.navigate(['/jobs']);

        })
        .catch((error) => {
          console.error('Failed to add job', error);
        });
    }
  }
}
