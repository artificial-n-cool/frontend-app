import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ReadHostResponse } from '../../types/ReadHostResponse';
import { HostDetailsService } from '../../services/host-details.service';

@Component({
  selector: 'app-host-details-view',
  templateUrl: './host-details-view.component.html',
  styleUrls: ['./host-details-view.component.scss'],
})
export class HostDetailsViewComponent {
  host?: ReadHostResponse;
  oceniForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private hostDetailsService: HostDetailsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {
    this.oceniForm = this.formBuilder.group({
      ocenaHosta: [3, Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const hostId = params['id'];
      console.log(`fetching ${hostId}`);
      this.fetchHost(hostId);
    });
  }

  onSubmit() {
    // if (!this.currentUserService.hasUser()) {
    //   let snackBarRef = this.snackBar.open('Ulogujte se da bi ste rezervisali smestaj', 'Uloguj me')
    //   snackBarRef.onAction().subscribe(() => {
    //     this.router.navigate(['/auth/login'])
    //   })
    //   return
    // }
    // if (!this.oceniForm.valid)
    //   return
    // console.log(this.oceniForm.value)
    // let createdReservation: HostOcenaRequest = {
    //   smestajID: this.route.snapshot.params['id'],
    //   statusRezervacije: "U_OBRADI",
    //   korisnikID: 'test-user-28061389',  // this.currentUserService.getCurrentUser()?.id!,
    //   brojOsoba: this.oceniForm.value.brojOsoba
    // }
    // this.reservationService.createReservation(createdReservation).subscribe({
    //   next: (response: Reservation) => {
    //     console.log(response)
    //     let snackBarRef = this.snackBar.open('Uspesno sacuvana rezervacija', 'Nastavi sa pretragom')
    //     snackBarRef.onAction().subscribe(() => {
    //       this.router.navigate(['/smestaj'])
    //     })
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error)
    //     this.snackBar.open(`Ups, doslo je do greske\n${error.status}: ${error.message}`);
    //   }
    // })
  }

  fetchHost(hostId: string) {
    // this.host = {
    //   id: 1,
    //   ime: 'Pera',
    //   prezime: 'Peric',
    //   prosecnaOcena: 4.2,
    // };
    this.hostDetailsService.getHost(hostId).subscribe(hostResponse => {
      this.host = hostResponse;
    });
  }
}
