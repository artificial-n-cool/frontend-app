import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'react-router-dom';
import { Observer, mergeMap } from 'rxjs';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../types/Reservation';

@Component({
  selector: 'app-inavailability-table',
  templateUrl: './inavailability-table.component.html',
  styleUrls: ['./inavailability-table.component.scss']
})
export class InavailabilityTableComponent {
  displayedColumns: string[] = [
    'datumOd',
    'datumDo',
    'actions',
  ]
  dataSource: MatTableDataSource<Reservation> =
    new MatTableDataSource<Reservation>();

  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = false;

  constructor(
    private currentUserService: CurrentUserService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.waitingResults = true;
    this.route.paramMap.pipe(
      mergeMap(params => {
        let residenceId = params.get('id')
        return this.reservationService.getAllUnavailabilitiesForResidence(residenceId!)
      })
      ).subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.pageable.pageSize;
        this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
        this.waitingResults = false;
      })
  }

  onSelectPage(event: any) {
    this.fetchData(event.pageIdx, event.pageSize);
  }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        this.waitingResults = false;
      },
    };
  }

  onDelete(reservation: Reservation) {
    if (!confirm('Da li ste sigurni da zelite da uklonite nedostupnost?'))
      return
    this.reservationService.deleteUnavailability(reservation.id!, reservation.smestajID).subscribe({
      next: () => {
        this.snackBar.open('Uspesno obrisano', 'OK')
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`, 'OK');
      }
    })
  }
}
