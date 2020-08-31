import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const API_URL = environment.apiUrl;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  localHostName = API_URL.toString();
  constructor(public auth: AuthService, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let hostName = this.localHostName;

    this.auth.loadToken();

    request = request.clone({
      setHeaders: {
        'Authorization': `token ${this.auth.authToken}`,
        'referer-domain': hostName,
        'Content-Type': 'application/json',
        'responseType': 'text'
      }
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status == 401) {
            this.snackBar.open('Your session has expired. Sign in again to continue working on awesome things.', '', { duration: 500 });

            setTimeout(()=>{
              this.auth.logout();
            }, 1000);
            return;
          }
          return event;
      }));

  }

}
