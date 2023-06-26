import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserDialogComponent } from 'src/app/modules/user/pages/create-update-user-dialog/create-update-user-dialog.component';
import { UserService } from 'src/app/modules/user/services/user-service/user.service';
import { UpdatePasswordDialogComponent } from 'src/app/modules/user/pages/update-password-dialog/update-password-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input()
  loggedIn: boolean = false;
  @Input()
  isAdmin: boolean = false;
  @Input()
  isManager: boolean = false;
  @Input()
  ime: string | undefined = '';
  @Input()
  prezime: string | undefined = '';

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private dialogService: MatDialog,
    private userService: UserService
  ) {}

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.router.navigate(['/auth/login']);
  }

  updateProfile(): void {
    let currentUser = this.currentUserService.getCurrentUser();
    if (currentUser === null) {
      return;
    }
    let id = currentUser.id;
    this.dialogService
      .open(CreateUpdateUserDialogComponent, {
        data: currentUser,
      })
      .componentInstance.onSaveChanges.subscribe((created) => {
        delete created.type;
        this.userService.updateUser(id, created).subscribe({
          next: (response) => {
            this.currentUserService.update(response);
            this.ime = this.currentUserService.getCurrentUser()?.ime;
            this.prezime = this.currentUserService.getCurrentUser()?.prezime;
          },
          error: (_) => {},
        });
      });
  }

  updatePassword(): void {
    let currentUser = this.currentUserService.getCurrentUser();
    if (currentUser === null) {
      return;
    }
    let id = currentUser.id;
    this.dialogService
      .open(UpdatePasswordDialogComponent, {
        data: currentUser,
      })
      .componentInstance.onUpdatePassword.subscribe((req) => {
        req.userId = id;
        this.userService.updatePassword(req).subscribe({
          next: (response) => {},
          error: (_) => {},
        });
      });
  }
}
