import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUserService } from '../../services/current-user-service/current-user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [
//         HttpClientTestingModule,
//         MatSnackBarModule,
//         MatToolbarModule,
//         MatMenuModule,
//         RouterTestingModule,
//         MatDialogModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatIconModule,
//         ReactiveFormsModule,
//       ],
//       providers: [AuthService, CurrentUserService],
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
