import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Promotion } from '../../types/Promotion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionService } from '../../services/promotion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Residency } from 'src/app/modules/residency-crud/types/Residency';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent {
  @Input() promotion?: Promotion;
  @Input() residenceId?: string;
  @Output() createResidency: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  invalidPromotion: boolean = false;
  waitingResults: boolean = true;

  selectedDays: number[] = [];
  days: { value: number, display: string }[] = [
    { value: 1, display: 'Poneđeljnik' },
    { value: 2, display: 'Utornik' },
    { value: 3, display: 'Sreda' },
    { value: 4, display: 'Četvrtak' },
    { value: 5, display: 'Petak' },
    { value: 6, display: 'Subota' },
    { value: 7, display: 'Neđelja' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private promotionService: PromotionService,
    private snackBar: MatSnackBar,
  ) {
    this.form = formBuilder.group({
      datumOd: [this.promotion?.datumOd ?? '', Validators.required],
      datumDo: [this.promotion?.datumDo ?? '', Validators.required],
      procenat: [this.promotion?.procenat ?? 100, Validators.compose([Validators.required, Validators.min(0)])]
    })
  }

  onSubmit() {
    if (this.promotion)
      this.updateExistingPromotion();
    else
      this.saveNewPromotion();
  }


  saveNewPromotion() {
    if (!this.form.valid)
      return;

    this.invalidPromotion = false;
    let createdPromotion: Promotion = {
      ...this.form.value,
      smestajId: this.residenceId,
      dani: this.selectedDays,
    }
    console.log(JSON.stringify(createdPromotion))

    this.promotionService.createPromotion(createdPromotion).subscribe({
      next: (response: Residency) => {
        console.table(response);
        this.snackBar.open('Napravili ste novu promociju')
        this.router.navigate(['/smestaj'])
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        console.log(error)
        console.log(error.status)
        console.log(error.message)
      }
    })
  }


  updateExistingPromotion() {
    if (!this.form.valid)
      return;

    this.invalidPromotion = false;
    let updatedPromotion: Promotion = {
      ...this.form.value,
      smestajId: this.residenceId,
      dani: this.selectedDays,
      id: this.promotion?.id!
    }
    console.log(JSON.stringify(updatedPromotion))

    this.promotionService.updatePromotion(updatedPromotion).subscribe({
      next: (response: Residency) => {
        console.table(response);
        this.snackBar.open('Izmenili ste postojecu promociju')
        this.router.navigate(['/smestaj'])
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        console.log(error)
        console.log(error.status)
        console.log(error.message)
      }
    })
  }


  
}
