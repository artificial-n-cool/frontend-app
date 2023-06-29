import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Residency } from '../../types/Residency';
import { ResidencyCrudService } from '../../services/residency-crud.service';
import { ResidencyService } from 'src/app/modules/residency/services/residency.service';
import { mergeMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-residency',
  templateUrl: './edit-residency.component.html',
  styleUrls: ['./edit-residency.component.scss']
})
export class EditResidencyComponent {
  residency?: Residency
  constructor(
    private route: ActivatedRoute,
    private residencyService: ResidencyService,
    private residencyCrudService: ResidencyCrudService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      mergeMap(params => {
        let residencyId: string = params.get('id')!
        return this.residencyService.getResidency(residencyId)
      })
    ).subscribe({
      next: response => {
        this.residency = response
        console.log(this.residency)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        console.log(error)
      }
    })
  }


}
