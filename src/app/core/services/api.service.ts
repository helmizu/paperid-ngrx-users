import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
  }
}
