import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { EXAMPLES } from './utils/constants.js'

describe('App', () => {
  it('renders the parser UI with a default valid expression', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Expression Parser' })).toBeInTheDocument()
    expect(screen.getByLabelText('Expression')).toHaveValue('1+2 = 3')
    expect(screen.getByText('True')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Abstract Syntax Tree' })).toBeInTheDocument()
  })

  it('updates the result when the input changes', () => {
    render(<App />)

    const input = screen.getByLabelText('Expression')
    fireEvent.change(input, { target: { value: '10-2*3' } })

    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('expression')).toBeInTheDocument()
  })

  it('shows an error state for invalid input', () => {
    render(<App />)

    const input = screen.getByLabelText('Expression')
    fireEvent.change(input, { target: { value: '1+(2=3' } })

    expect(screen.getByText(/Invalid query/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Abstract Syntax Tree' })).not.toBeInTheDocument()
  })

  it('loads example expressions from chips', async () => {
    const user = userEvent.setup()
    render(<App />)

    const example = EXAMPLES.find(ex => ex === '2*3+4=10')
    await user.click(screen.getByRole('button', { name: example }))

    expect(screen.getByLabelText('Expression')).toHaveValue(example)
    expect(screen.getByText('True')).toBeInTheDocument()
  })
})
