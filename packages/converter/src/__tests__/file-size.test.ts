import { describe, expect, test } from 'vitest'
import { convertFileSize } from '../file-size'

describe('convertFileSize', () => {
  test('identity conversion returns same value', () => {
    expect(convertFileSize(123, 'MB', 'MB', 'win')).toBe(123)
    expect(convertFileSize(123, 'megabyte', 'megabyte', 'mac')).toBe(123)
  })

  test('win system: 1 KB -> 1024 B', () => {
    expect(convertFileSize(1, 'KB', 'B', 'win')).toBe(1024)
    expect(convertFileSize(1024, 'B', 'KB', 'win')).toBe(1)
  })

  test('win system: higher units', () => {
    expect(convertFileSize(1, 'MB', 'KB', 'win')).toBe(1024)
    expect(convertFileSize(1, 'GB', 'MB', 'win')).toBe(1024)
    expect(convertFileSize(1, 'TB', 'GB', 'win')).toBe(1024)
  })

  test('mac system uses 1000 step', () => {
    expect(convertFileSize(1, 'KB', 'B', 'mac')).toBe(1000)
    expect(convertFileSize(2, 'MB', 'KB', 'mac')).toBe(2 * 1000)
  })

  test('supports name aliases and mixed usage', () => {
    expect(convertFileSize(1.5, 'MB', 'KB', 'win')).toBe(1.5 * 1024)
    expect(convertFileSize(1, 'kilobyte', 'B', 'win')).toBe(1024)
  })

  test('zero and negative values', () => {
    expect(convertFileSize(0, 'GB', 'MB', 'win')).toBe(0)
    expect(convertFileSize(-1, 'KB', 'B', 'win')).toBe(-1024)
  })

  test('very large conversions', () => {
    // 1 TB -> 1024 GB
    expect(convertFileSize(1, 'TB', 'GB', 'win')).toBe(1024)
    // 1 PB -> 1024 TB
    expect(convertFileSize(1, 'PB', 'TB', 'win')).toBe(1024)
  })

  test('non-finite input returns NaN', () => {
    expect(Number.isNaN(convertFileSize(Number.NaN as any, 'B', 'KB', 'win'))).toBe(true)
    expect(Number.isNaN(convertFileSize(Infinity as any, 'B', 'KB', 'win'))).toBe(true)
    expect(Number.isNaN(convertFileSize(-Infinity as any, 'B', 'KB', 'win'))).toBe(true)
  })

  test('throws on unknown unit', () => {
    expect(() => convertFileSize(1, 'foo' as any, 'B', 'win')).toThrow()
    expect(() => convertFileSize(1, 'B', 'bar' as any, 'win')).toThrow()
  })

  test('huge value overflows to Infinity', () => {
    expect(convertFileSize(Number.MAX_VALUE, 'YB', 'B', 'win')).toBe(Infinity)
    expect(convertFileSize(-Number.MAX_VALUE, 'YB', 'B', 'win')).toBe(-Infinity)
  })

  test('tiny value underflows to 0', () => {
    expect(convertFileSize(Number.MIN_VALUE, 'B', 'YB', 'win')).toBe(0)
  })

  test('unit names are case sensitive', () => {
    expect(() => convertFileSize(1, 'mb' as any, 'B', 'win')).toThrow()
  })
})
