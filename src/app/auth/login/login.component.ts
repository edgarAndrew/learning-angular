import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule,CommonModule,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,private userDataService: UserDataService) {}

  ngOnInit() {
    firstValueFrom(this.authService.loadUser())
    .then((response) => {
      this.userDataService.setUsername(response.username);
      this.userDataService.setUserId(response.userId);
      this.userDataService.setUserAuthenticated(true);
      this.router.navigate(['/jobs']);
    })
    .catch((error) => {
      console.error('Load user failed : ', error);
      this.userDataService.setUserAuthenticated(false);
    });
  } 
  onSubmit() {
    firstValueFrom(this.authService.loginUser(this.loginData))
      .then((response) => {
        //console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.name);
        this.userDataService.setUserAuthenticated(true);
        this.router.navigate(['/jobs']);
      })
      .catch((error) => {
        console.error('Login failed', error);
        alert('Incorrect email/password');
      });
  }
}
