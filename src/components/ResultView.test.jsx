import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ResultView from './ResultView.jsx'

describe('ResultView', () => {
  it('renders boolean results for statements', () => {
    const { container, rerender } = render(
      <ResultView outcome={{ statement: true, result: true }} />,
    )

    expect(screen.getByText('statement')).toBeInTheDocument()
    expect(screen.getByText('True')).toBeInTheDocument()
    expect(container.querySelector('.result-box')).toHaveClass('is-true')

    rerender(<ResultView outcome={{ statement: true, result: false }} />)
    expect(screen.getByText('False')).toBeInTheDocument()
    expect(container.querySelector('.result-box')).toHaveClass('is-false')
  })

  it('renders numeric results for expressions', () => {
    const { container } = render(
      <ResultView outcome={{ statement: false, result: 4 }} />,
    )

    expect(screen.getByText('expression')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(container.querySelector('.result-box')).toHaveClass('is-number')
  })
})
