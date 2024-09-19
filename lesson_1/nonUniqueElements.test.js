import { nonUniqueElements } from './nonUniqueElements';


test('returns non unique elements', () => {
  expect(nonUniqueElements([1, 2, 3, 1, 3])).toEqual([1, 3, 1, 3]);
  expect(nonUniqueElements([1, 2, 3, 4, 5])).toEqual([]);
  expect(nonUniqueElements([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
  expect(nonUniqueElements([10, 9, 10, 10, 9, 8])).toEqual([10, 9, 10, 10, 9]);
})

test('throw error with non array arg', () => {
  expect(() => nonUniqueElements(123)).toThrow("Argument must be array");
  expect(() => nonUniqueElements({})).toThrow("Argument must be array");
  expect(() => nonUniqueElements('123')).toThrow("Argument must be array");
  expect(() => nonUniqueElements()).toThrow("Argument must be array");
  expect(() => nonUniqueElements(NaN)).toThrow("Argument must be array");
})

test('throw error with non number data item', () => {
  expect(() => nonUniqueElements([1, '2', 1])).toThrow("Data item must be number");
  expect(() => nonUniqueElements([NaN, '', undefined])).toThrow("Data item must be number");
})
