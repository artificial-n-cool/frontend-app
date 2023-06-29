import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { ReadResidencyResponse } from '../../types/ReadResidencyResponse';
import { ResidencyRequest } from '../../types/ResidencyRequest';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { OceneResidencyRequest } from '../../types/OceneResidencyRequest';
import { ResidencyService } from '../../services/residency.service';

@Component({
  selector: 'app-residency-ocene-table',
  templateUrl: './residency-ocene-table.component.html',
  styleUrls: ['./residency-ocene-table.component.scss'],
})
export class ResidencyOceneTableComponent implements OnInit {
  displayedColumns: string[] = ['username', 'datum', 'ocena'];
  dataSource: MatTableDataSource<ReadResidencyResponse> =
    new MatTableDataSource<ReadResidencyResponse>();
  searchParams: OceneResidencyRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;
  myResidencyId: string = "";

  constructor(
    private route: ActivatedRoute,
    private residencyService: ResidencyService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const residencyId = params['id'];
      this.myResidencyId = residencyId;
      this.fetchData(0, this.defaultPageSize, residencyId);
    });
  }

  fetchData(pageIdx: number, pageSize: number, residencyId: string): void {
    this.waitingResults = true;
    if (Object.keys(this.searchParams).length === 0) {
      this.searchParams = {
        smestajId: residencyId,
      };
    }
    this.residencyService
      .readResidencyOceneList(this.searchParams)
      .subscribe((page) => {
        this.dataSource.data = page;
      });
  }

  onViewResidency(residencyId: String): void {
    this.router.navigate(['/residency-details', residencyId]);
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize, this.myResidencyId);
  }

//   onSearchResidencyItem(params: OceneResidencyRequest): void {
//     this.searchParams = params;
//     this.fetchData(0, this.pageSize, this.myResidencyId);
//   }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize, this.myResidencyId);
      },
      error: (err) => {
        this.errorService.handle(err);
        this.waitingResults = false;
      },
    };
  }
}
