import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private host = "http://127.0.0.1:8000/api/"
  private token: string
  private headers: HttpHeaders

  constructor(
    private hpptClient: HttpClient,
    private authService: AuthServiceService
  ) { 
    this.token = this.authService.getUserToken();
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getAllUsers = () => {
    const url = `${this.host}users`

    return this.hpptClient.get(url, {headers: this.headers})
  }

  getUserById = (id: Number) => {
    const url = `${this.host}users/${id}`;

    return this.hpptClient.get(url, {headers: this.headers});
  }

  updateUser = (id: Number, body: {}) => {
    const url = `${this.host}users/${id}`;

    return this.hpptClient.put(url, body, {headers: this.headers});
  }
}
