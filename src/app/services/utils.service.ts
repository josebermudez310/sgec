import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl = 'http://localhost:8000/api';
  private token: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { 
    this.token = this.authService.getUserToken();
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  
  // Manejo de autenticación
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers: this.headers });
  }

  me(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/me`, {}, { headers: this.headers });
  }

  refresh(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh`, {});
  }

  // CRUD de usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { headers: this.headers });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data, { headers: this.headers });
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data, { headers: this.headers });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  // Subir imágenes para usuarios
  uploadUserImages(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}/upload-images`, formData, { headers: this.headers });
  }

  // CRUD de salas
  getSalas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas`, { headers: this.headers });
  }

  getSala(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas/${id}`, { headers: this.headers });
  }

  createSala(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salas`, data, { headers: this.headers });
  }

  updateSala(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/salas/${id}`, data, { headers: this.headers });
  }

  deleteSala(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/salas/${id}`, { headers: this.headers });
  }

  // CRUD de eventos
  getEventos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos`, { headers: this.headers });
  }

  getEvento(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${id}`, { headers: this.headers });
  }

  createEvento(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/eventos`, data, { headers: this.headers });
  }

  updateEvento(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/eventos/${id}`, data, { headers: this.headers });
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eventos/${id}`, { headers: this.headers });
  }

  // Actualizar contraseña de usuario
  updatePassword(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password/${id}`, data, { headers: this.headers });
  }
}
