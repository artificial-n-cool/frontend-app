import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../types/Promotion';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Residency } from '../../residency-crud/types/Residency';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient: HttpClient) { }

  createPromotion(createdPromotion: Promotion): Observable<Residency> {
    return this.httpClient.put<Residency>(
      `${environment.hostPath}/api/host/promocija`, createdPromotion
    )
  }

  updatePromotion(updatedPromotion: Promotion): Observable<Residency> {
    return this.httpClient.put<Residency>(
      `${environment.hostPath}/api/host/promocija`,
      updatedPromotion
    )
  }

  findByResidenceAndId(id: string, residenceId: string): Observable<Promotion> {
    return this.httpClient.get<Promotion>(
      `${environment.hostPath}/api/host/smestaj/promocija/${id}/for/${residenceId}`
    )
  }

  read(
    page: number,
    size: number,
    residencyId: string
  ): Observable<PaginatedResponse<Promotion>> {
    return this.httpClient.get<PaginatedResponse<Promotion>>(
      `${environment.hostPath}/api/host/smestaj/promocije/${residencyId}`,
      {
        params: {
          page: page,
          size: size,
          sort: 'datumOd,asc',
        },
      }
    );
  }
}
