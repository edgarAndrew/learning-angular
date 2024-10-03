import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule], // Add necessary imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      // Perform your registration logic here
      console.log('Registration Data: ', this.registerData);
    }
  }
}
