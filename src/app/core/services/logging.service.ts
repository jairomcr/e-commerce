import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  logError(error: any) {
    console.error('[LOGGING SERVICE]', error);

    // Simulación de envío remoto
    localStorage.setItem('error-log', JSON.stringify({ error, date: new Date() }));
  }
}
