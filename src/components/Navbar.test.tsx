import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Wellness Directory')).toBeInTheDocument()
  })

  it('renders a hamburger button to open the menu', () => {
    render(<Navbar />)
    expect(
      screen.getByRole('button', { name: /open navigation menu/i }),
    ).toBeInTheDocument()
  })

  it('opens the mobile drawer when the hamburger is clicked', async () => {
    render(<Navbar />)

    // Drawer is kept mounted but hidden, so its close button is not accessible yet.
    expect(
      screen.queryByRole('button', { name: /close navigation menu/i }),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /open navigation menu/i }))

    expect(
      await screen.findByRole('button', { name: /close navigation menu/i }),
    ).toBeVisible()
  })
})
