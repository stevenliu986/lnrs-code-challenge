import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ErrorView from './ErrorView.jsx'

describe('ErrorView', () => {
  it('renders error message and location', () => {
    render(
      <ErrorView
        input="1 + @"
        error={{ message: 'Unexpected token.', line: 1, col: 5 }}
      />,
    )

    expect(screen.getByText(/Invalid query/)).toBeInTheDocument()
    expect(screen.getByText('1 + @')).toBeInTheDocument()
    expect(screen.getByText(/Unexpected token\./)).toBeInTheDocument()
    expect(screen.getByText(/line 1, column 5/)).toBeInTheDocument()
  })

  it('positions the caret under the error column', () => {
    const { container } = render(
      <ErrorView
        input="abc"
        error={{ message: 'Bad input.', line: 1, col: 2 }}
      />,
    )

    expect(container.querySelector('.error-caret').textContent).toBe(' ^')
  })

  it('renders a blank source line when input is empty', () => {
    const { container } = render(
      <ErrorView
        input=""
        error={{ message: 'Empty input.', line: 1, col: 1 }}
      />,
    )

    expect(container.querySelector('.error-caret')).toHaveTextContent('^')
  })
})
