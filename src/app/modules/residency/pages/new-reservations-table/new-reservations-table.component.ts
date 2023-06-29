import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, mergeMap } from 'rxjs';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../types/Reservation';

@Component({
  selector: 'app-new-reservations-table',
  templateUrl: './new-reservations-table.component.html',
  styleUrls: ['./new-reservations-table.component.scss']
})
export class NewReservationsTableComponent {
  displayedColumns: string[] = [
    'naziv',
    'datumOd',
    'datumDo',
    'status',
    'actions',
  ]
  dataSource: MatTableDataSource<Reservation> =
    new MatTableDataSource<Reservation>();

  smestajId: string = ''
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
    this.route.paramMap.pipe(
      mergeMap(params => {
        this.smestajId = params.get('id')!
        return this.reservationService.getAllNew(this.smestajId, 0, this.defaultPageSize)
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

  fetchData(smestajId: string, pageIdx: number, pageSize: number): void { 
    this.waitingResults = true;
    this.reservationService.getAllNew(smestajId, pageIdx+1, pageSize)
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
    this.fetchData(this.smestajId, event.pageIdx, event.pageSize);
  }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(this.smestajId, page ?? this.pageNum, this.pageSize);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        this.waitingResults = false;
      },
    };
  }

  onAccept(reservation: Reservation) {
    if (!confirm('Da li ste sigurni da zelite da prihvatite rezervaciju?'))
      return
    this.reservationService.acceptReservation(reservation.id!, reservation.smestajID).subscribe({
      next: () => {
        this.snackBar.open('Uspesno otkazano', 'OK')
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`, 'OK');
      }
    })
  }

  onReject(reservation: Reservation) {
    if (!confirm('Da li ste sigurni da zelite da prihvatite rezervaciju?'))
      return
    this.reservationService.acceptReservation(reservation.id!, reservation.smestajID).subscribe({
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
