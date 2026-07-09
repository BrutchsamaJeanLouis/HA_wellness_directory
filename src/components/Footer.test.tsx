import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('shows the current year in the copyright line', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`${year} Wellness Directory`)),
    ).toBeInTheDocument()
  })
})
