import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalNotificationComponent } from './global-notification.component';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';


class MockNotificationService {
  private _errorMessage = signal<string | null>('Error de prueba');

  errorMessage() {
    return this._errorMessage();
  }

  setError(message: string | null) {
    this._errorMessage.set(message);
  }
}

describe('GlobalNotificationComponent', () => {
  let fixture: ComponentFixture<GlobalNotificationComponent>;
  let component: GlobalNotificationComponent;
  let mockNotificationService: MockNotificationService;

  beforeEach(() => {
    mockNotificationService = new MockNotificationService();

    TestBed.configureTestingModule({
      imports: [CommonModule, GlobalNotificationComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    });

    fixture = TestBed.createComponent(GlobalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje de error cuando hay uno', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Error de prueba');
  });

  it('no debería mostrar nada cuando no hay mensaje de error', () => {
    mockNotificationService.setError(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('');
  });
});
