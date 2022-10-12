import { normalizeUrl } from './utils';

describe('normalizeUrl', () => {
  it('should return string', () => {
    const path = normalizeUrl('https://avito.ru', '/kazan');
    expect(typeof path).toBe('string');
  });
});
