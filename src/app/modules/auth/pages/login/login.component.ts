import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../services/current-user-service/current-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() error!: string | null;
  form: FormGroup;

  invalidUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.invalidUser = false;
    this.authService.login(this.form.value).subscribe({
      next: response => {
        this.currentUserService.setCurrentUser(response);
        // TODO: Navigate to a page based on the user's role
        // this.snackBar.open(`Welcome, ${response.name} ${response.surname}!`, "Dismiss", { duration: 5000, verticalPosition: "top" });
        const destination: string | null = this.route.snapshot.queryParamMap.get('to');
        if (destination) {
          this.router.navigate([destination]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      error: _ => {
        this.invalidUser = true;
      }
    });
  }
}