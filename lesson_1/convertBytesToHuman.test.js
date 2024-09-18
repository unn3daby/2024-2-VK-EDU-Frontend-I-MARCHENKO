/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import { convertBytesToHuman } from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false);
  expect(convertBytesToHuman('1024')).toBe(false);
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman(undefined)).toBe(false);
  expect(convertBytesToHuman({})).toBe(false);
  expect(convertBytesToHuman([])).toBe(false);
});

test('Возвращает некорректное значение для NaN', () => {
  expect(convertBytesToHuman(NaN)).toBe(false)
 
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B')
  expect(convertBytesToHuman(1)).toBe('1 B')
  expect(convertBytesToHuman(5)).toBe('5 B')
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(1024 * 1024)).toBe('1 MB');
  expect(convertBytesToHuman(1024 * 1024 * 1024)).toBe('1 GB');
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe('1048576 TB');
});

test('Возвращает корректное дробное значение для чисел', () => {
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB')
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 1.5)).toBe('1.50 GB');
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1.5)).toBe('1.50 TB');
});
// другая группа проверок
