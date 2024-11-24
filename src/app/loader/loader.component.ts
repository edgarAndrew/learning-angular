import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-loader',
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  standalone: true
})
export class LoaderComponent implements OnInit {
  isLoading:boolean = false;

  constructor(private authService: AuthService, private jobsService: JobsService) {}

  ngOnInit() {
    // Subscribe to the loading$ observable
    this.authService.loading$.subscribe((loading) => {
      // console.log('Loader Component',loading);
      this.isLoading = loading;
    });

    this.jobsService.loading$.subscribe((loading) => {
      // console.log('Loader Component',loading);
      this.isLoading = loading;
    });
  }
}
