import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Promotion } from '../../types/Promotion';
import { PromotionService } from '../../services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-promotions-table',
  templateUrl: './promotions-table.component.html',
  styleUrls: ['./promotions-table.component.scss']
})
export class PromotionsTableComponent {
  displayedColumns: string[] = [
    'datumOd',
    'datumDo',
    'procenat',
  ]
  dataSource: MatTableDataSource<Promotion> =
    new MatTableDataSource<Promotion>();

  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = false;

  constructor(
    private promotionService: PromotionService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchData(1, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    let residencyId = this.route.snapshot.params['id']
    this.waitingResults = true;
    this.promotionService
      .read(pageIdx+1, pageSize, residencyId)
      .subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.pageable.pageSize;
        this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
        this.waitingResults = false;
      })
  }

  onSelectPage(event: any): void {
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

  onEdit(promotion: Promotion) {
    alert(`${promotion.id} wanna edit boi?`)
    console.log(promotion)
  }
}
