import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencyPageComponent } from './residency-page.component';

describe('ResidencyPageComponent', () => {
  let component: ResidencyPageComponent;
  let fixture: ComponentFixture<ResidencyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidencyPageComponent]
    });
    fixture = TestBed.createComponent(ResidencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
