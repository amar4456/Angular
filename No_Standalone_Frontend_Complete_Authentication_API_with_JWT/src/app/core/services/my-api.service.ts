import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  private apiUrl = 'http://localhost:8000/api'; // Replace with your API endpoint

  private unseenMessagesCountSubject = new BehaviorSubject<number>(0);

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

  convertToExcel(endpoint: string, imageData: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, { imageData }, { responseType: 'blob' });
  }

  convertImageToText(endpoint: string, imageData: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, { imageData });
  }

  unseenMessagesCount$ = this.unseenMessagesCountSubject.asObservable();
  updateUnseenMessagesCount(count: number) {
    this.unseenMessagesCountSubject.next(count);
  }
}
