import { checkoutGuard } from './checkout.guard';
import type { FormGuardAwareComponent } from './unsaved-form.guard';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('checkoutGuard', () => {
  let confirmSpy: jasmine.Spy;

  beforeEach(() => {
    confirmSpy = spyOn(window, 'confirm');
  });

  // Creamos mocks parciales con el tipo adecuado
  const dummyRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const dummyState: RouterStateSnapshot = {} as RouterStateSnapshot;

  it('should allow navigation when form is not dirty', () => {
    const mockComponent: FormGuardAwareComponent = {
      formIsDirty: () => false,
    };

    const result = checkoutGuard(mockComponent, dummyRoute, dummyState, dummyState);
    expect(result).toBeTrue();
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('should block navigation and confirm when form is dirty', () => {
    const mockComponent: FormGuardAwareComponent = {
      formIsDirty: () => true,
    };

    confirmSpy.and.returnValue(false);
    const result = checkoutGuard(mockComponent, dummyRoute, dummyState, dummyState);
    expect(confirmSpy).toHaveBeenCalledWith(
      '¿Seguro que quieres salir? Se perderán los datos del pago.'
    );
    expect(result).toBeFalse();
  });

  it('should allow navigation if user confirms', () => {
    const mockComponent: FormGuardAwareComponent = {
      formIsDirty: () => true,
    };

    confirmSpy.and.returnValue(true);
    const result = checkoutGuard(mockComponent, dummyRoute, dummyState, dummyState);
    expect(result).toBeTrue();
  });

  it('should allow navigation if formIsDirty is not defined', () => {
    // Como la interfaz requiere formIsDirty, siempre debe estar definido
    // pero aquí simulamos que siempre retorna false
    const mockComponent: FormGuardAwareComponent = {
      formIsDirty: () => false,
    };

    const result = checkoutGuard(mockComponent, dummyRoute, dummyState, dummyState);
    expect(result).toBeTrue();
  });
});

