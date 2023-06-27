import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { ReadResidencyResponse } from '../../types/ReadResidencyResponse';
import { ResidencyRequest } from '../../types/ResidencyRequest';
import { ResidencyService } from '../../services/residency.service';
import * as moment from 'moment';
@Component({
  selector: 'app-residency-table',
  templateUrl: './residency-table.component.html',
  styleUrls: ['./residency-table.component.scss'],
})
export class ResidencyTableComponent implements OnInit {
  displayedColumns: string[] = [
    'naziv',
    'lokacija',
    'pogodnosti',
    'opis',
    'minGostiju',
    'maxGostiju',
    'prosecnaOcena',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadResidencyResponse> =
    new MatTableDataSource<ReadResidencyResponse>();
  searchParams: ResidencyRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;

  constructor(
    private residencyService: ResidencyService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.waitingResults = true;
    if (Object.keys(this.searchParams).length === 0) {
      this.searchParams = {
        location: '',
        numGuests: 0,
        from: moment(
          new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
        ).format('yyyy-MM-DD'),
        to: moment(
          new Date(new Date().getTime() + 1000 * 24 * 60 * 60 * 1000)
        ).format('yyyy-MM-DD'),
      };
    }
    this.residencyService
      .read(pageIdx, pageSize, this.searchParams)
      .subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.totalPages;
        this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
        this.waitingResults = false;
      });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onSearchResidencyItem(params: ResidencyRequest): void {
    this.searchParams = params;
    this.fetchData(0, this.pageSize);
  }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize);
      },
      error: (err) => {
        this.errorService.handle(err);
        this.waitingResults = false;
      },
    };
  }
}
