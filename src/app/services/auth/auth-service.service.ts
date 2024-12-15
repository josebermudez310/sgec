import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { USER_AUTH_TOKEN } from '../../constants/LocalStorageConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    private host = "http://localhost:8000/api/";
    constructor(
      private hpptClient: HttpClient
    ) { }
  
    register = (body: {}) => {
      const url = `${this.host}auth/register`;
  
      return this.hpptClient.post(url, body);
    }

    login = (body: any) => {
      const url = `${this.host}auth/login`;

      console.log('login')

      return this.hpptClient.post(url, body).pipe(map((response: any) => {
        const { access_token: token } = response;

        localStorage.setItem(USER_AUTH_TOKEN, token);

        return response
      }));
    }

    getUserToken = () :string => {
      return localStorage.getItem(USER_AUTH_TOKEN) || '';
    }

    logout = () => {
      const url = `${this.host}auth/logout`;

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getUserToken()}`);
      console.log(headers)

      return this.hpptClient.post(url, {}, { headers });
    }
}
