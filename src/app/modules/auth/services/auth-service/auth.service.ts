import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { AuthResponse } from '../../types/AuthResponse';
import { AuthRequest } from '../../types/AuthRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(auth: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.basePath}/api/auth/login`, auth)
  }
}
