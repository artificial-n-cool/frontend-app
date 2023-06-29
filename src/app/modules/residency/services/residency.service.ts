import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReadResidencyResponse } from '../types/ReadResidencyResponse';
import { ResidencyRequest } from '../types/ResidencyRequest';
import { Residency } from '../../residency-crud/types/Residency';
import { ResidencyOcenaRequest } from '../types/ResidencyOcenaRequest';
import { DeleteRatingResidencyRequest } from '../types/DeleteRatingResidencyRequest';

@Injectable({
  providedIn: 'root',
})
export class ResidencyService {

  constructor(private http: HttpClient) {}

  getResidency(residencyId: string): Observable<Residency> {
    return this.http.get<Residency>(`${environment.guestPath}/api/guest/smestaj/${residencyId}`)
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

  oceniResidency(req: ResidencyOcenaRequest): Observable<ReadResidencyResponse> {
    return this.http.put<ReadResidencyResponse>(
      `${environment.guestPath}/api/guest/smestaj/oceniSmestaj`,
      req
    );
  }
  
  deleteOcenaResidency(req: DeleteRatingResidencyRequest): Observable<ReadResidencyResponse> {
    return this.http.put<ReadResidencyResponse>(
      `${environment.guestPath}/api/guest/smestaj/obrisiOcenuSmestaja`,
      req
    );
  }

}
