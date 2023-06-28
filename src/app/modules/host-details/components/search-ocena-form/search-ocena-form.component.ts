import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostRequest } from '../../types/HostRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-search-ocena-form',
  templateUrl: './search-ocena-form.component.html',
  styleUrls: ['./search-ocena-form.component.scss'],
})
export class SearchOcenaFormComponent {
  form: FormGroup;
  @Output()
  searchHost: EventEmitter<HostRequest> =
    new EventEmitter<HostRequest>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ime: [''],
    });
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
