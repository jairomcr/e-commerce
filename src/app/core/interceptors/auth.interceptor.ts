import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { Observable, catchError, throwError } from 'rxjs';
  import { NotificationService } from '../services/notification.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private readonly notificationService = inject(NotificationService);
  
    intercept<T>(
      req: HttpRequest<T>,
      next: HttpHandler
    ): Observable<HttpEvent<T>> {
      const modifiedReq = req.clone({
        setHeaders: {
          'X-Custom-Header': 'AngularChallenge2025',
        },
      });
  
      return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          const message =
            typeof error.error === 'string'
              ? error.error
              : error.error?.message ?? 'Error inesperado en la aplicación';
  
          this.notificationService.showError(message);
  
          return throwError(() => error);
        })
      );
    }
  }
  