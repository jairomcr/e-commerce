import { Component, computed, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-global-notification',
  standalone: true,
  template: `
    @if (errorMessage()) {
      <div
        class="fixed top-20 right-4 bg-red-600 text-white p-4 rounded shadow z-50"
      >
        {{ errorMessage() }}
      </div>
    }
  `,
})
export class GlobalNotificationComponent {
  private notificationService = inject(NotificationService);
  errorMessage = computed(() => this.notificationService.errorMessage());
}
