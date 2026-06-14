import { describe, expect, it } from 'vitest'
import { evaluate, isStatement, parse, run } from './index.js'

describe('parse', () => {
  it('rejects empty input', () => {
    expect(parse('')).toEqual({
      ok: false,
      error: {
        message: 'Empty input - type an expression.',
        line: 1,
        col: 1,
        offset: 0,
      },
    })
    expect(parse('   ').ok).toBe(false)
    expect(parse(null).ok).toBe(false)
  })

  it('parses arithmetic expressions', () => {
    const result = parse('1 + 2')
    expect(result.ok).toBe(true)
    expect(result.ast).toEqual({
      type: 'binary',
      op: '+',
      left: { type: 'number', value: 1 },
      right: { type: 'number', value: 2 },
    })
  })

  it('respects operator precedence', () => {
    const result = parse('2 * 3 + 4')
    expect(result.ok).toBe(true)
    expect(result.ast).toEqual({
      type: 'binary',
      op: '+',
      left: {
        type: 'binary',
        op: '*',
        left: { type: 'number', value: 2 },
        right: { type: 'number', value: 3 },
      },
      right: { type: 'number', value: 4 },
    })
  })

  it('parses comparisons', () => {
    const result = parse('1 + 2 = 3')
    expect(result.ok).toBe(true)
    expect(result.ast.type).toBe('comparison')
    expect(result.ast.op).toBe('=')
  })

  it('parses unary minus and parentheses', () => {
    const result = parse('-(1 + 2)')
    expect(result.ok).toBe(true)
    expect(result.ast).toEqual({
      type: 'unary',
      op: '-',
      operand: {
        type: 'group',
        expr: {
          type: 'binary',
          op: '+',
          left: { type: 'number', value: 1 },
          right: { type: 'number', value: 2 },
        },
      },
    })
  })

  it('reports incomplete input', () => {
    const result = parse('1 +')
    expect(result.ok).toBe(false)
    expect(result.error.message).toBe(
      'Unexpected end of input - the expression is incomplete.',
    )
  })

  it('reports unexpected tokens', () => {
    const result = parse('1 @ 2')
    expect(result.ok).toBe(false)
    expect(result.error.message).toMatch(/Invalid character/)
  })
})

describe('evaluate', () => {
  it('evaluates numbers and groups', () => {
    expect(evaluate({ type: 'number', value: 7 })).toBe(7)
    expect(
      evaluate({
        type: 'group',
        expr: { type: 'number', value: 5 },
      }),
    ).toBe(5)
  })

  it('evaluates binary operators', () => {
    const node = {
      type: 'binary',
      op: '+',
      left: { type: 'number', value: 2 },
      right: { type: 'number', value: 3 },
    }
    expect(evaluate(node)).toBe(5)
    expect(
      evaluate({
        type: 'binary',
        op: '/',
        left: { type: 'number', value: 8 },
        right: { type: 'number', value: 2 },
      }),
    ).toBe(4)
  })

  it('evaluates unary minus', () => {
    expect(
      evaluate({
        type: 'unary',
        op: '-',
        operand: { type: 'number', value: 4 },
      }),
    ).toBe(-4)
  })

  it('evaluates comparisons with epsilon tolerance', () => {
    expect(
      evaluate({
        type: 'comparison',
        op: '=',
        left: { type: 'number', value: 0.1 + 0.2 },
        right: { type: 'number', value: 0.3 },
      }),
    ).toBe(true)
    expect(
      evaluate({
        type: 'comparison',
        op: '!=',
        left: { type: 'number', value: 1 },
        right: { type: 'number', value: 2 },
      }),
    ).toBe(true)
  })

  it('throws for unknown node or operator', () => {
    expect(() => evaluate({ type: 'unknown' })).toThrow(/Unknown node type/)
    expect(() =>
      evaluate({
        type: 'binary',
        op: '%',
        left: { type: 'number', value: 1 },
        right: { type: 'number', value: 2 },
      }),
    ).toThrow(/Unknown operator/)
  })
})

describe('isStatement', () => {
  it('detects comparison nodes', () => {
    expect(isStatement({ type: 'comparison', op: '=' })).toBe(true)
    expect(isStatement({ type: 'binary', op: '+' })).toBe(false)
  })
})

describe('run', () => {
  it('returns parsed and evaluated results for valid input', () => {
    const result = run('1+2=3')
    expect(result).toEqual({
      ok: true,
      statement: true,
      result: true,
      ast: expect.objectContaining({ type: 'comparison', op: '=' }),
    })
  })

  it('returns numeric results for pure expressions', () => {
    const result = run('10-2*3')
    expect(result.ok).toBe(true)
    expect(result.statement).toBe(false)
    expect(result.result).toBe(4)
  })

  it('propagates parse errors', () => {
    const result = run('1+(2=3')
    expect(result.ok).toBe(false)
    expect(result.error.message).toContain('Unexpected end of input')
  })
})
