import { Component } from '@angular/core';
import { Reservation } from '../../types/Reservation';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {
  displayedColumns: string[] = [
    'naziv',
    'datumOd',
    'datumDo',
    'status',
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
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchData(0, this.defaultPageSize)
  }

  fetchData(pageIdx: number, pageSize: number): void {
    let userId = this.currentUserService.getCurrentUser()?.id!;
    this.waitingResults = true;
    this.reservationService.getAllForUser(userId, pageIdx+1, pageSize)
      .subscribe((page) => {
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

  onCancel(reservation: Reservation) {
    if (!confirm('Da li ste sigurni da zelite da otkazete rezervaciju?'))
      return
    this.reservationService.cancelReservation(reservation.id!, reservation.smestajID).subscribe({
      next: () => {
        this.snackBar.open('Uspesno otkazano', 'OK')
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`, 'OK');
      }
    })
  }
}
