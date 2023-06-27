import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Residency } from '../../../types/Residency';
import { ResidencyCrudService } from '../../../services/residency-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-residency-form',
  templateUrl: './residency-form.component.html',
  styleUrls: ['./residency-form.component.scss']
})
export class ResidencyFormComponent {
  @Input() residency?: Residency;
  @Output() createResidency: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  residencyImages: Array<string> = [];
  invalidResidency: boolean = false;
  waitingResults: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private residencyService: ResidencyCrudService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
      this.form = this.formBuilder.group({
        naziv: [this.residency ? this.residency.naziv : '', Validators.required],
        lokacija: [this.residency ? this.residency.lokacija : '', Validators.required],
        pogodnosti: [this.residency ? this.residency.pogodnosti : '', Validators.required],
        opis: [this.residency ? this.residency.opis : '', Validators.required],
        minGostiju: [this.residency ? this.residency.minGostiju : 1, Validators.compose([
          Validators.required, Validators.min(1)
        ])],
        maxGostiju: [this.residency ? this.residency.maxGostiju : 2, Validators.compose([
          Validators.required, Validators.min(1)
        ])],
        baseCena: [this.residency ? this.residency.baseCena : 0, Validators.min(0)],
        tipCene: [this.residency ? this.residency.tipCene : 'PO_SMESTAJU'],
      });
      this.residency ? this.residency.slike : []
  }

  onSubmit() {
    if (this.residency)
      this.updateExistingResidency();
    else
      this.saveNewResidency();

  }

  saveNewResidency() {
    if (!this.form.valid)
      return;

    this.invalidResidency = false;
    let createdResidency: Residency = { ...this.form.value, slike: this.residencyImages }
    console.log(JSON.stringify(createdResidency))

    this.residencyService.createResidency(createdResidency).subscribe({
      next: (response: Residency) => {
        console.table(response);
        this.snackBar.open('Napravili ste novi smestaj');
        this.router.navigate(['/'])  // TODO: navigate to all residencies
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        console.log(error)
        console.log(error.status)
        console.log(error.message)
      }
    })
  }

  updateExistingResidency() {
    if (!this.form.valid)
      return;

    this.invalidResidency = false;

    let updatedResidency: Residency = { 
      ...this.form.value, 
      id: this.residency!.id, 
      slike: this.residency!.slike, 
      vlasnikID: this.residency!.vlasnikID 
    
    }
    this.residencyService.updateResidency(updatedResidency).subscribe({
      next: (response: Residency) => {
        console.table(response);
        this.snackBar.open('Izmenili ste postojeci smestaj');
        this.router.navigate(['/'])  // TODO: navigate to all residencies
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
        console.log(error)
        console.log(error.status)
        console.log(error.message)
      }
    })
  }

  onFileSelect(event: any) {
    const files: FileList = event.target.files;
    const fileArray: Array<File> = Array.from(files);

    fileArray.forEach((file: File) => {
      this.convertToBase64(file).then((base64: string) => {
        this.residencyImages.push(base64)
        console.log(base64)
      });
    })
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64)
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  }

}
