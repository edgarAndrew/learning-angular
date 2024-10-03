import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private username: string = '';

  // Set the username
  setUsername(name: string) {
    this.username = name;
  }

  // Get the username
  getUsername(): string {
    return this.username;
  }
}
