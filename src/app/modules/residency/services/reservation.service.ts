import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../types/Reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: Reservation) {
    return this.httpClient.post<Reservation>(`${environment.guestPath}/api/guest/rezervacije`, reservation)
  }
}
