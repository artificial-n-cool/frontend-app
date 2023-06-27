import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadUserResponse } from '../../types/ReadUserResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-remove-account-dialog',
  templateUrl: './remove-account-dialog.component.html',
  styleUrls: ['./remove-account-dialog.component.scss']
})
export class RemoveAccountDialogComponent {
  form: FormGroup;
  isCreate: boolean;
  onRemoveAccount: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RemoveAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public User: ReadUserResponse
  ) {
    this.isCreate = this.User.id === 0;
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onRemoveAccount.emit(this.form.value);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
