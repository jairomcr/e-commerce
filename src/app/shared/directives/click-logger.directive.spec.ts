import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickLoggerDirective } from './click-logger.directive';

@Component({
  template: `<button [appClickLogger] [logMessage]="msg">Haz clic</button>`,
  standalone: true,
  imports: [ClickLoggerDirective],
})
class TestHostComponent {
  msg = 'Mensaje personalizado';
}

describe('ClickLoggerDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent], // ya incluye la directiva
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('debería registrar el mensaje personalizado al hacer clic', () => {
    const consoleSpy = spyOn(console, 'log');
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(consoleSpy).toHaveBeenCalledWith('Mensaje personalizado');
  });

  it('debería usar el mensaje por defecto si no se proporciona input', () => {
    const consoleSpy = spyOn(console, 'log');

    // Cambia el input a undefined para probar el mensaje por defecto
    fixture.componentInstance.msg = undefined as unknown as string;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(consoleSpy).toHaveBeenCalledWith('Elemento clickeado');
  });
});
