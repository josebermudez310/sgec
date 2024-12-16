import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private host = "http://localhost:8000/api/"; // URL base de tu API

  constructor(private httpClient: HttpClient) {}

  // Método para agregar un nuevo evento
  addEvent = (body: any): Observable<any> => {
    const url = `${this.host}calendar`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Log de la URL y el cuerpo antes de enviarlo
    console.log('URL:', url);
    console.log('Body que se enviará:', body);
    
    return this.httpClient.post(url, body, { headers }).pipe(
      map((response: any) => {
        console.log('Evento creado:', response);
        return response;
      })
    );
  };

 getEvents = (): Observable<any> => {
  const url = `${this.host}calendar`;
  return this.httpClient.get(url).pipe(
    map((response: any) => {
      console.log('Eventos obtenidos:', response);
      return response;
    })
  );}

  // // Método para eliminar un evento por ID
  // deleteEvent = (eventId: number): Observable<any> => {
  //   const url = `${this.host}events/${eventId}`;
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    
  //   return this.httpClient.delete(url, { headers }).pipe(
  //     map((response: any) => {
  //       console.log('Evento eliminado:', response);
  //       return response;
  //     })
  //   );
  // };

  // // Método para actualizar un evento por ID
  // updateEvent = (eventId: number, body: any): Observable<any> => {
  //   const url = `${this.host}events/${eventId}`;
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  //   return this.httpClient.put(url, body, { headers }).pipe(
  //     map((response: any) => {
  //       console.log('Evento actualizado:', response);
  //       return response;
  //     })
  //   );
  // };

  // Obtener el token del usuario almacenado en LocalStorage
  private getAuthToken = (): string => {
    return localStorage.getItem('USER_AUTH_TOKEN') || '';
  };
}
