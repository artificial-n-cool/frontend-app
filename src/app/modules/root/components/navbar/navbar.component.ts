import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/current-user-service/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
    private router: Router
  ) { }

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.router.navigate(["/auth/login"]);
  }
}
