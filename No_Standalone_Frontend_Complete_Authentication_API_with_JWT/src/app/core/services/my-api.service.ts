import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  private apiUrl = 'http://localhost:8000/api'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getData(endpoint: string, token: string): Observable<any> {
    // Create headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the HTTP request with the provided headers
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { headers });
  }

  postData(endpoint: string, data: any, token?: string): Observable<any> {
    // Create headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Make the HTTP request with the provided headers
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, { headers });
  }
}
