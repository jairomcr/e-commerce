import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('debería capitalizar la primera letra y poner el resto en minúscula', () => {
    const result = pipe.transform('angular');
    expect(result).toBe('Angular');
  });

  it('debería convertir todo en minúscula excepto la primera letra', () => {
    const result = pipe.transform('aNGuLAR');
    expect(result).toBe('Angular');
  });

  it('debería devolver cadena vacía si se le pasa una cadena vacía', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('debería devolver undefined si se le pasa undefined', () => {
    const result = pipe.transform(undefined as unknown as string);
    expect(result).toBeUndefined();
  });

  it('debería devolver null si se le pasa null', () => {
    const result = pipe.transform(null as unknown as string);
    expect(result).toBeNull();
  });
});
