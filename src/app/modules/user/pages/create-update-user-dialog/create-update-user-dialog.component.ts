import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadUserResponse } from '../../types/ReadUserResponse';

@Component({
  selector: 'app-create-update-user-dialog',
  templateUrl: './create-update-user-dialog.component.html',
  styleUrls: ['./create-update-user-dialog.component.scss']
})
export class CreateUpdateUserDialogComponent {
  form: FormGroup;
  isCreate: boolean;
  onSaveChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public User: ReadUserResponse
  ) {
    this.isCreate = this.User.id === 0;
    this.form = this.formBuilder.group({
      username: [User.username, Validators.compose([Validators.required])],
      password: [this.isCreate ? '' : "nonempty", Validators.required],
      ime: [User.ime, Validators.required],
      prezime: [User.prezime, Validators.required],
      email: [User.email, Validators.required],
      prebivaliste: [User.prebivaliste, Validators.required],
      type: [User.authorities?.find(Boolean), Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSaveChanges.emit(this.form.value);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
