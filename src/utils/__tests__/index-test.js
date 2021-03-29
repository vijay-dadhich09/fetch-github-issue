import { objectEmptyCheck } from '../index';
describe('Utls test', () => {
  it('objectEmptyCheck should return true if object is empty', () => {
    const result = objectEmptyCheck({})
    expect(result).toBe(true);
  });

  it('objectEmptyCheck should return fale if object is not empty', () => {
    const result = objectEmptyCheck({ name: 'hello'});
    expect(result).toBe(false);
  });
})
