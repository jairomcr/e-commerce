import { ShortDescriptionPipe } from './short-description.pipe';

describe('ShortDescriptionPipe', () => {
  let pipe: ShortDescriptionPipe;

  beforeEach(() => {
    pipe = new ShortDescriptionPipe();
  });

  it('should return empty string when input is null or undefined', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as unknown as string)).toBe('');
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return the original string if it is shorter than the limit', () => {
    const result = pipe.transform('Hello', 10);
    expect(result).toBe('Hello');
  });

  it('should return a shortened string with "..." if it exceeds the limit', () => {
    const result = pipe.transform('This is a long description.', 10);
    expect(result).toBe('This is a ...');
  });

  it('should use the default limit (15) if not provided', () => {
    const result = pipe.transform('This is a long description without custom limit');
    expect(result).toBe('This is a long ...');
  });

  it('should return exactly the limit length plus "..." if longer', () => {
    const value = '12345678901234567890'; // 20 chars
    const result = pipe.transform(value, 10);
    expect(result).toBe('1234567890...');
  });
});
