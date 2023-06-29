import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import { ReservationService } from '../../services/reservation.service';
import { ResidencyService } from '../../services/residency.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Reservation } from '../../types/Reservation';

@Component({
  selector: 'app-inavailability-form',
  templateUrl: './inavailability-form.component.html',
  styleUrls: ['./inavailability-form.component.scss']
})
export class InavailabilityFormComponent {
  unavailabilityForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private residencyService: ResidencyService,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) {
    this.unavailabilityForm =  this.formBuilder.group({
      datumOd: ['', Validators.required],
      datumDo: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const residencyId = params['id'];
      console.log(`fetching ${residencyId}`)
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
    if (!this.unavailabilityForm.valid)
      return

      console.log(this.unavailabilityForm.value)

      let datumOd = moment(this.unavailabilityForm.value['datumOd']).format('yyyy-MM-DD').substring(0, 10)
      let datumDo = moment(this.unavailabilityForm.value['datumDo']).format('yyyy-MM-DD').substring(0, 10)
      let createdReservation: Reservation = {
        datumOd,
        datumDo,
        smestajID: this.route.snapshot.params['id'],
        statusRezervacije: "PRIHVACENO",
        korisnikID: this.currentUserService.getCurrentUser()?.id!,
        brojOsoba: this.unavailabilityForm.value.brojOsoba
      }
      
      this.reservationService.createUnavailability(createdReservation).subscribe({
        next: (response: Reservation) => {
          console.log(response)
          let snackBarRef = this.snackBar.open('Uspesno sacuvana nedostupnost', 'Nastavi sa pretragom')
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
}
