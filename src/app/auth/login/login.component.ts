import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,private userDataService: UserDataService) {}

  onSubmit() {
    firstValueFrom(this.authService.loginUser(this.loginData))
      .then((response) => {
        //console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/jobs']);
        this.userDataService.setUsername(response.user.name);
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }
}
