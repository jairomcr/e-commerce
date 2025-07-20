import { CanDeactivateFn } from '@angular/router';
import { FormGuardAwareComponent } from './unsaved-form.guard';

export const checkoutGuard: CanDeactivateFn<FormGuardAwareComponent> = (component) => {
  const hasUnsavedData =
    typeof component?.formIsDirty === 'function' && component.formIsDirty();

  if (hasUnsavedData) {
    return confirm('¿Seguro que quieres salir? Se perderán los datos del pago.');
  }

  return true;
};
