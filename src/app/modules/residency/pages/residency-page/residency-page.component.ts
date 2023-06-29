import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Residency } from 'src/app/modules/residency-crud/types/Residency';
import { ResidencyService } from '../../services/residency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import * as moment from 'moment';
import { Reservation } from '../../types/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-residency-page',
  templateUrl: './residency-page.component.html',
  styleUrls: ['./residency-page.component.scss']
})
export class ResidencyPageComponent {
  residency?: Residency;
  reservationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private residencyService: ResidencyService,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) {
    this.reservationForm =  this.formBuilder.group({
      datumOd: ['', Validators.required],
      datumDo: ['', Validators.required],
      brojOsoba: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const residencyId = params['id'];
      console.log(`fetching ${residencyId}`)
      this.fetchResidency(residencyId);
    });
  }

  onSubmit() {
    // TODO: Test this 
    if (!this.currentUserService.hasUser()) {
      let snackBarRef = this.snackBar.open('Ulogujte se da bi ste rezervisali smestaj', 'Uloguj me')
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/auth/login'])
      })
      return
    }
    if (!this.reservationForm.valid)
      return


    console.log(this.reservationForm.value)

    let datumOd = moment(this.reservationForm.value['datumOd']).format('yyyy-MM-DD')
    let datumDo = moment(this.reservationForm.value['datumDo']).format('yyyy-MM-DD')
    let createdReservation: Reservation = {
      datumOd,
      datumDo,
      smestajID: this.route.snapshot.params['id'],
      statusRezervacije: "U_OBRADI",
      korisnikID: 'test-user-28061389',  // this.currentUserService.getCurrentUser()?.id!,
      brojOsoba: this.reservationForm.value.brojOsoba
    }
    
    this.reservationService.createReservation(createdReservation).subscribe({
      next: (response: Reservation) => {
        console.log(response)
        let snackBarRef = this.snackBar.open('Uspesno sacuvana rezervacija', 'Nastavi sa pretragom')
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/smestaj'])
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
      }
    })
  }

  fetchResidency(residencyId: string) {
    this.residencyService.getResidency(residencyId).subscribe(residency => {
      this.residency = residency;
    });
  }

  onPromote() {
    let residencyId = this.route.snapshot.params['id'];
    this.router.navigate(['smestaj/promotions/', residencyId])
  }

  onUnavail() {
    let residencyId = this.route.snapshot.params['id'];
    this.router.navigate(['smestaj/unavailabilities/', residencyId])
  }

  onCheckRes() {
    let residencyId = this.route.snapshot.params['id'];
    this.router.navigate(['smestaj/new-reservations/', residencyId])
  }
}
