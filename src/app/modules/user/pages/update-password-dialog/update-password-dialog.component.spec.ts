import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user-service/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';

// const MatMdcDialogData = new InjectionToken<any>('MatMdcDialogData');

// describe('CreateUpdateUserDialogComponent', () => {
//   let component: CreateUpdateUserDialogComponent;
//   let fixture: ComponentFixture<CreateUpdateUserDialogComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CreateUpdateUserDialogComponent],
//       imports: [HttpClientTestingModule, MatDialogModule],
//       providers: [
//         UserService,
//         { provide: MatDialogRef, useValue: {} },
//         { provide: MatMdcDialogData, useValue: {} },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreateUpdateUserDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
