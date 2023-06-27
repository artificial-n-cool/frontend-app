import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidencyRequest } from '../../types/ResidencyRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-residency-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  searchResidency: EventEmitter<ResidencyRequest> =
    new EventEmitter<ResidencyRequest>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      location: [''],
      numGuests: [0],
      from: [new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), Validators.required],
      to: [new Date(new Date().getTime() + 1000 * 24 * 60 * 60 * 1000), Validators.required]
    });
  }

  onDateRangeSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    const request: ResidencyRequest = {
      ...this.form.value,
      from: moment(this.form.value.from).format('yyyy-MM-DD'),
      to: moment(this.form.value.to).format('yyyy-MM-DD')
    };
    this.searchResidency.emit(request);
  }

  onReset(): void {
    this.form.setValue({
      location: '',
      numGuests: 0,
      from: moment(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)).format('yyyy-MM-DD'),
      to: moment(new Date(new Date().getTime() + 1000 * 24 * 60 * 60 * 1000)).format('yyyy-MM-DD')
    });
    this.searchResidency.emit(this.form.value);
  }
}
