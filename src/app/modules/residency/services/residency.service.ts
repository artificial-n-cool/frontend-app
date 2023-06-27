import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReadResidencyResponse } from '../types/ReadResidencyResponse';
import { ResidencyRequest } from '../types/ResidencyRequest';

@Injectable({
  providedIn: 'root',
})
export class ResidencyService {
  constructor(private http: HttpClient) {}

  read(
    page: number,
    size: number,
    params: ResidencyRequest
  ): Observable<PaginatedResponse<ReadResidencyResponse>> {
    return this.http.get<PaginatedResponse<ReadResidencyResponse>>(
      `${environment.guestPath}/api/guest/smestaj/search`,
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
