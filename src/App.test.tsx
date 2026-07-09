import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App — resource filtering', () => {
  const search = () => screen.getByRole('textbox', { name: /search resources/i })

  it('shows every category section by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Podcasts' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Articles' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Meditation' })).toBeInTheDocument()
  })

  it('filters resources by title as the user types', async () => {
    render(<App />)
    await userEvent.type(search(), 'stretch')

    expect(screen.getByRole('heading', { name: 'Fitness' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '10-Minute Morning Stretch' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Podcasts' })).not.toBeInTheDocument()
  })

  it('filters resources by tag', async () => {
    render(<App />)
    await userEvent.type(search(), 'nutrition')

    expect(screen.getByRole('heading', { name: 'Recipes' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Energy Boost Smoothie' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Podcasts' })).not.toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    render(<App />)
    await userEvent.type(search(), 'zzzzz')

    expect(screen.getByText(/no resources match/i)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Podcasts' })).not.toBeInTheDocument()
  })
})
