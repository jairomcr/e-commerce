import { TestBed } from '@angular/core/testing';
import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { NotificationService } from '../services/notification.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let nextHandlerSpy: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showError']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    nextHandlerSpy = httpHandlerSpy;
  });

  it('should add X-Custom-Header to the request headers', (done) => {
    const request = new HttpRequest('GET', '/test');

    // Mock handle to return observable of empty HttpEvent
    nextHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, nextHandlerSpy).subscribe(() => {
      // Verificamos que el request fue clonado y modificado
      const modifiedRequest = nextHandlerSpy.handle.calls.mostRecent().args[0] as HttpRequest<any>;
      expect(modifiedRequest.headers.has('X-Custom-Header')).toBeTrue();
      expect(modifiedRequest.headers.get('X-Custom-Header')).toBe('AngularChallenge2025');
      done();
    });
  });

  it('should call showError on notificationService when an HTTP error occurs and propagate the error', (done) => {
    const request = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: { message: 'Error personalizado' },
    });

    nextHandlerSpy.handle.and.returnValue(throwError(() => errorResponse));

    interceptor.intercept(request, nextHandlerSpy).subscribe({
      next: () => {
        // No debe emitirse next porque hay error
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(notificationServiceSpy.showError).toHaveBeenCalledWith('Error personalizado');
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('should show default error message if error.error.message is missing', (done) => {
    const request = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({
      status: 400,
      error: {}, // Sin message
    });

    nextHandlerSpy.handle.and.returnValue(throwError(() => errorResponse));

    interceptor.intercept(request, nextHandlerSpy).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(notificationServiceSpy.showError).toHaveBeenCalledWith('Error inesperado en la aplicación');
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('should show error string directly if error.error is a string', (done) => {
    const request = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({
      status: 400,
      error: 'Mensaje error directo',
    });

    nextHandlerSpy.handle.and.returnValue(throwError(() => errorResponse));

    interceptor.intercept(request, nextHandlerSpy).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(notificationServiceSpy.showError).toHaveBeenCalledWith('Mensaje error directo');
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
