import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../types/Reservation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private httpClient: HttpClient) { }

  acceptReservation(reservationId: string, smestajID: string) {
    return this.httpClient.put<Reservation>(
      `${environment.hostPath}/api/host/rezervacije/accept/${reservationId}/${smestajID}`, null
    )
  }

  rejectReservation(reservationId: string, smestajID: string) {
    return this.httpClient.put<Reservation>(
      `${environment.hostPath}/api/host/rezervacije/reject/${reservationId}/${smestajID}`, null
    )
  }

  createReservation(reservation: Reservation) {
    return this.httpClient.post<Reservation>(`${environment.guestPath}/api/guest/smestaj/rezervisiSmestaj`, reservation)
  }

  getAllForUser(userId: string, page: number, size: number): Observable<PaginatedResponse<Reservation>> {
    return this.httpClient.get<PaginatedResponse<Reservation>>(`${environment.hostPath}/api/host/rezervacije/by-guset/${userId}`, {
      params: {
        page: page,
        size: size,
        sort: 'datumOd,asc',
      },
    })
  }

  getAllNew(smestajId: string, page: number, size: number): Observable<PaginatedResponse<Reservation>> {
    return this.httpClient.get<PaginatedResponse<Reservation>>(`${environment.hostPath}/api/host/rezervacije/nove/${smestajId}`, {
      params: {
        page: page,
        size: size,
        sort: 'datumOd,asc',
      },
    })
  }

  getAllUnavailabilitiesForResidence(residenceId: string, page: number, size: number): Observable<PaginatedResponse<Reservation>> {
    return this.httpClient.get<PaginatedResponse<Reservation>>(`${environment.hostPath}/api/host/rezervacije/get-unavailable/${residenceId}`, {
      params: {
        page: page,
        size: size,
        sort: 'datumOd,asc',
      },
    })
  }

  cancelReservation(reservationId: string, residenceId: string) {
    return this.httpClient.put<void>(`${environment.guestPath}/api/guest/smestaj/otkaziRezervaciju`, {
      smestajID: residenceId,
      rezervacijaID: reservationId
    })
  }

  deleteUnavailability(unavailabilityId: string, residenceId: string) {
    return this.httpClient.delete(`${environment.hostPath}/api/host/rezervacije/delete-unavailability/${unavailabilityId}/${residenceId}`)
  }
}
