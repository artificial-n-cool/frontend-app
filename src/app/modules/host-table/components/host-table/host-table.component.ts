import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { ReadHostResponse } from '../../types/ReadHostResponse';
import { HostRequest } from '../../types/HostRequest';
import { HostTableService } from '../../services/host-table.service';
import * as moment from 'moment';

@Component({
  selector: 'app-host-table',
  templateUrl: './host-table.component.html',
  styleUrls: ['./host-table.component.scss'],
})
export class HostTableComponent implements OnInit {
  displayedColumns: string[] = ['ime', 'prezime', 'prosecnaOcena'];
  dataSource: MatTableDataSource<ReadHostResponse> =
    new MatTableDataSource<ReadHostResponse>();
  searchParams: HostRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;

  constructor(
    private hostService: HostTableService,
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
        ime: '',
      };
    }
    this.hostService
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

  onSearchHostItem(params: HostRequest): void {
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
