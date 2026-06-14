import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AstNode from './AstNode.jsx'

describe('AstNode', () => {
  it('renders a number node', () => {
    render(<AstNode node={{ type: 'number', value: 42 }} />)

    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('number')).toBeInTheDocument()
  })

  it('renders a binary node with children', () => {
    render(
      <AstNode
        node={{
          type: 'binary',
          op: '+',
          left: { type: 'number', value: 1 },
          right: { type: 'number', value: 2 },
        }}
      />,
    )

    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('add')).toBeInTheDocument()
    expect(screen.getByText('left')).toBeInTheDocument()
    expect(screen.getByText('right')).toBeInTheDocument()
    expect(screen.getAllByText('number', { selector: '.ast-label' })).toHaveLength(2)
  })

  it('renders comparison, unary, and group nodes', () => {
    const { rerender } = render(
      <AstNode
        node={{
          type: 'comparison',
          op: '!=',
          left: { type: 'number', value: 1 },
          right: { type: 'number', value: 2 },
        }}
      />,
    )

    expect(screen.getByText('!=')).toBeInTheDocument()
    expect(screen.getByText('not equals')).toBeInTheDocument()

    rerender(
      <AstNode
        node={{
          type: 'unary',
          op: '-',
          operand: { type: 'number', value: 5 },
        }}
      />,
    )
    expect(screen.getByText('negate')).toBeInTheDocument()
    expect(screen.getByText('operand')).toBeInTheDocument()

    rerender(
      <AstNode
        node={{
          type: 'group',
          expr: { type: 'number', value: 9 },
        }}
      />,
    )
    expect(screen.getByText('group')).toBeInTheDocument()
    expect(screen.getByText('expr')).toBeInTheDocument()
  })

  it('falls back for unknown node types', () => {
    render(<AstNode node={{ type: 'custom' }} />)

    expect(screen.getByText('custom')).toBeInTheDocument()
    expect(screen.getByText('?')).toBeInTheDocument()
  })
})
