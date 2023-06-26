import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../services/current-user-service/current-user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserDialogComponent } from 'src/app/modules/user/pages/create-update-user-dialog/create-update-user-dialog.component';
import { UserService } from 'src/app/modules/user/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() error!: string | null;

  @Output()
  createUser: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;

  invalidUser: boolean = false;

  waitingResults: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialogService: MatDialog,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.invalidUser = false;
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.currentUserService.setCurrentUser(response);
        // TODO: Navigate to a page based on the user's role
        // this.snackBar.open(`Welcome, ${response.name} ${response.surname}!`, "Dismiss", { duration: 5000, verticalPosition: "top" });
        const destination: string | null =
          this.route.snapshot.queryParamMap.get('to');
        if (destination) {
          this.router.navigate([destination]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (_) => {
        this.invalidUser = true;
      },
    });
  }

  onCreateUserClick() {
    this.dialogService
      .open(CreateUpdateUserDialogComponent, {
        data: {
          id: 0,
          ime: '',
          prezime: '',
          email: '',
          type: 'HOST',
          prebivaliste: '',
        },
      })
      .componentInstance.onSaveChanges.subscribe((created) => {
        this.waitingResults = true;
        if (created.type === 'HOST') {
          delete created.type;
          console.log(created);
          this.userService.createHost(created).subscribe({
            next: (response) => {
              this.router.navigate(['/auth/login']);
            },
            error: (_) => {},
          });
        } else {
          this.userService.createGuest(created).subscribe({
            next: (response) => {
              this.router.navigate(['/auth/login']);
            },
            error: (_) => {},
          });
        }
      });
  }
}
