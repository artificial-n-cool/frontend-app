import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { ReadHostResponse } from '../../types/ReadHostResponse';
import { HostRequest } from '../../types/HostRequest';
import { HostDetailsService } from '../../services/host-details.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { OceneHostRequest } from '../../types/OceneHostRequest';

@Component({
  selector: 'app-host-ocene-table',
  templateUrl: './host-ocene-table.component.html',
  styleUrls: ['./host-ocene-table.component.scss'],
})
export class HostOceneTableComponent implements OnInit {
  displayedColumns: string[] = ['username', 'datum', 'ocena'];
  dataSource: MatTableDataSource<ReadHostResponse> =
    new MatTableDataSource<ReadHostResponse>();
  searchParams: OceneHostRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;
  myHostId: string = "";

  constructor(
    private route: ActivatedRoute,
    private hostService: HostDetailsService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const hostId = params['id'];
      this.myHostId = hostId;
      this.fetchData(0, this.defaultPageSize, hostId);
    });
  }

  fetchData(pageIdx: number, pageSize: number, hostId: string): void {
    this.waitingResults = true;
    if (Object.keys(this.searchParams).length === 0) {
      this.searchParams = {
        hostId: hostId,
      };
    }
    this.hostService
      .readHostOceneList(this.searchParams)
      .subscribe((page) => {
        this.dataSource.data = page;
      });
  }

  onViewHost(hostId: String): void {
    this.router.navigate(['/host-details', hostId]);
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize, this.myHostId);
  }

//   onSearchHostItem(params: OceneHostRequest): void {
//     this.searchParams = params;
//     this.fetchData(0, this.pageSize, this.myHostId);
//   }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize, this.myHostId);
      },
      error: (err) => {
        this.errorService.handle(err);
        this.waitingResults = false;
      },
    };
  }
}
