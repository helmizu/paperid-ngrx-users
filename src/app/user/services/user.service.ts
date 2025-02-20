import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "./user.types";
import { ApiService } from '../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>("users");
  }

  getUser(userId: number): Observable<User> {
    return this.apiService.get<User>(`users/${userId}`);
  }
}
