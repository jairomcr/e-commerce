import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  errorMessage = signal<string | null>(null);

  showError(message: string) {
    this.errorMessage.set(message);
    setTimeout(() => this.errorMessage.set(null), 3000);
  }
}
