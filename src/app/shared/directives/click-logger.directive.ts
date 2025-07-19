import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickLogger]',
  standalone: true,
})
export class ClickLoggerDirective {
  @Input() logMessage: string = 'Elemento clickeado';

  @HostListener('click')
  handleClick() {
    console.log(this.logMessage);
  }
}
