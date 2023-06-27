import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Residency } from '../types/Residency';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidencyCrudService {

  constructor(private http: HttpClient) { }

  createResidency(residency: Residency): Observable<Residency> {
    return this.http.post<Residency>(`http://localhost:8080/api/host/smestaj`, residency)
  }

  updateResidency(residency: Residency): Observable<Residency> {
    return this.http.put<Residency>(`${environment.hostPath}/api/host/smestaj`, residency)
  }
}
