import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostRequest } from '../../types/HostRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-host-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  searchHost: EventEmitter<HostRequest> =
    new EventEmitter<HostRequest>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ime: [''],
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
    const request: HostRequest = {
      ...this.form.value,
    };
    this.searchHost.emit(request);
  }

  onReset(): void {
    this.form.setValue({
      ime: '',
    });
    this.searchHost.emit(this.form.value);
  }
}
