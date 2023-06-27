import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadUserResponse } from '../../types/ReadUserResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent {
  form: FormGroup;
  isCreate: boolean;
  onUpdatePassword: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public User: ReadUserResponse
  ) {
    this.isCreate = this.User.id === 0;
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onUpdatePassword.emit(this.form.value);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
