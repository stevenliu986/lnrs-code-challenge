import { describe, expect, it } from 'vitest'
import { formatNumber } from './formatNumber.js'

describe('formatNumber', () => {
  it('formats integers without decimals', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(42)).toBe('42')
    expect(formatNumber(-7)).toBe('-7')
  })

  it('trims trailing zeros from floats', () => {
    expect(formatNumber(0.1)).toBe('0.1')
    expect(formatNumber(3.14)).toBe('3.14')
    expect(formatNumber(1.2)).toBe('1.2')
  })

  it('stringifies non-finite values', () => {
    expect(formatNumber(Infinity)).toBe('Infinity')
    expect(formatNumber(-Infinity)).toBe('-Infinity')
    expect(formatNumber(NaN)).toBe('NaN')
  })
})
