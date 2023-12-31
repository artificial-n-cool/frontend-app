import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReadHostResponse } from '../types/ReadHostResponse';
import { HostRequest } from '../types/HostRequest';

@Injectable({
  providedIn: 'root',
})
export class HostTableService {
  constructor(private http: HttpClient) {}

  read(
    page: number,
    size: number,
    params: HostRequest
  ): Observable<PaginatedResponse<ReadHostResponse>> {
    return this.http.get<PaginatedResponse<ReadHostResponse>>(
      `${environment.guestPath}/api/guest/korisnik/search-hosts`,
      {
        params: {
          ...params,
          page: page,
          size: size,
          sort: 'id,asc',
        },
      }
    );
  }
}
