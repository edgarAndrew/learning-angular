import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router'; 
import { LoaderComponent } from '../../loader/loader.component';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule,CommonModule,LoaderComponent], // Add necessary imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: ''
  };

  constructor (private authService: AuthService, private userDataService: UserDataService,private router: Router) {}

  onSubmit() {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      firstValueFrom(this.authService.registerUser(this.registerData))
      .then((response) => {
        //console.log('Register successful', response);
        this.userDataService.setUsername(response.user.name);
        localStorage.setItem('token', response.token);
        this.userDataService.setUserAuthenticated(true);
        this.router.navigate(['/jobs']);
      })
      .catch((error) => {
        // console.error('Register failed', error.error.message);
        alert('Failed: ' + error.error.message);
      });
    }
    else
      alert('Please fill all the fields');
  }
}
