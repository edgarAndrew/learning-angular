import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private username: string;
  private userId: string;
  private isAuthenticated: boolean;

  constructor() { 
    this.isAuthenticated = this.tokenExists();
    this.username = '';
    this.userId = '';
  }

  // Set the username
  setUsername(name: string) {
    this.username = name;
  }

  // Get the username
  getUsername(): string {
    if (localStorage.getItem('username') !== null){
      return localStorage.getItem('username') || '';
    }
    return this.username;
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId(): string { 
    return this.userId;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setUserAuthenticated(status: boolean) {
    this.isAuthenticated = status;
  }

  tokenExists(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearUserData() {
    localStorage.removeItem('token');
    this.username = '';
    this.userId = '';
    this.isAuthenticated = false;
  }
}
