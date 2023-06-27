import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReadResidencyResponse } from '../types/ReadResidencyResponse';
import { ResidencyRequest } from '../types/ResidencyRequest';
import { Residency } from '../../residency-crud/types/Residency';

@Injectable({
  providedIn: 'root',
})
export class ResidencyService {

  constructor(private http: HttpClient) {}

  getResidency(residencyId: string): Observable<Residency> {
    return this.http.get<Residency>(`${environment.hostPath}/api/host/smestaj/${residencyId}`)
  }

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
