import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { localHostName } from './../../../global.variables';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  localHostName = localHostName.toString();
  constructor(public auth: AuthService, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let hostName = window.location.hostname.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
    hostName = ((hostName.indexOf('localhost')) > -1 || (hostName.indexOf('192.168')) > -1 ||
    (hostName.indexOf('3.129.12.90') > -1)) ? this.localHostName : hostName;

    this.auth.loadToken();

    request = request.clone({
      setHeaders: {
        Authorization: `token ${this.auth.authToken}`
        // 'referer-domain': hostName
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
