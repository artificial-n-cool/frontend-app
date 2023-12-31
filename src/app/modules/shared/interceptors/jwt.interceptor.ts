import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../auth/services/current-user-service/current-user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private currentUserService: CurrentUserService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.currentUserService.getCurrentUser();
    let jwt: string = "";
    if (user) {
      jwt = user.jwt;
    }
    const cloned = request.clone({
      headers: request.headers
        .set("Authorization", `Bearer ${jwt}`)
        .set("Content-Type", "application/json"),
      responseType: "json"
    });
    return next.handle(cloned);
  }
}
