import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReadHostResponse } from '../types/ReadHostResponse';
import { HostRequest } from '../types/HostRequest';
import { HostOcenaRequest } from '../types/HostOcenaRequest';
import { DeleteRatingRequest } from '../types/DeleteRatingRequest';
import { OceneHostRequest } from '../types/OceneHostRequest';

@Injectable({
  providedIn: 'root',
})
export class HostDetailsService {
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

    readHostOcene(
    page: number,
    size: number,
    params: OceneHostRequest
  ): Observable<PaginatedResponse<ReadHostResponse>> {
    return this.http.get<PaginatedResponse<ReadHostResponse>>(
      `${environment.guestPath}/api/guest/korisnik/search-host-ratings`,
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

readHostOceneList(
    params: OceneHostRequest
  ): Observable<Array<ReadHostResponse>> {
    return this.http.get<Array<ReadHostResponse>>(
      `${environment.guestPath}/api/guest/korisnik/search-host-ratings-list`,
      {
        params: {
          ...params,
        },
      }
    );
  }


  getHost(hostId: string): Observable<ReadHostResponse> {
    return this.http.get<ReadHostResponse>(
      `${environment.guestPath}/api/guest/korisnik/${hostId}`
    );
  }

  oceniHost(req: HostOcenaRequest): Observable<ReadHostResponse> {
    return this.http.put<ReadHostResponse>(
      `${environment.guestPath}/api/guest/korisnik/oceniHosta`,
      req
    );
  }

  deleteOcenaHost(req: DeleteRatingRequest): Observable<ReadHostResponse> {
    return this.http.put<ReadHostResponse>(
      `${environment.guestPath}/api/guest/korisnik/obrisiOcenuHosta`,
      req
    );
  }
}
