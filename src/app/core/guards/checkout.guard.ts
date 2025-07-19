import { CanDeactivateFn } from '@angular/router';

export const checkoutGuard: CanDeactivateFn<any> = (component) => {
  const hasUnsavedData =
    typeof component?.formIsDirty === 'function' && component.formIsDirty();

  if (hasUnsavedData) {
    return confirm('¿Seguro que quieres salir? Se perderán los datos del pago.');
  }

  return true;
};
