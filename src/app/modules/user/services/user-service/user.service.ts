import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserRequest } from '../../types/CreateUserRequest';
import { CreateUserResponse } from '../../types/CreateUserResponse';
import { UpdateUserRequest } from '../../types/UpdateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  createHost(request: CreateUserRequest): Observable<CreateUserResponse> {
    let a =  this.http.post<CreateUserResponse>(`${environment.basePath}/api/auth/signup-host`, request);
    console.log(a)
    return a
  }

  createGuest(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${environment.basePath}/api/auth/signup-guest`, request);
  }

}