import { render, screen } from '@testing-library/react'
import { ResourceCard } from './ResourceCard'
import { makeResource } from '../test/fixtures'

describe('ResourceCard', () => {
  it('renders the title as a heading', () => {
    render(<ResourceCard resource={makeResource({ title: 'The Science of Sleep' })} />)
    expect(
      screen.getByRole('heading', { name: 'The Science of Sleep' }),
    ).toBeInTheDocument()
  })

  it('shows the category and duration in minutes', () => {
    render(<ResourceCard resource={makeResource({ category: 'Articles', duration: 8 })} />)
    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.getByText(/8\s*min/)).toBeInTheDocument()
  })

  it('renders the thumbnail using the title as alt text', () => {
    render(
      <ResourceCard
        resource={makeResource({ title: 'Mindful Moments', thumbnail: 'https://img/x.jpg' })}
      />,
    )
    const img = screen.getByRole('img', { name: 'Mindful Moments' })
    expect(img).toHaveAttribute('src', 'https://img/x.jpg')
  })

  it('renders the description text', () => {
    render(<ResourceCard resource={makeResource({ description: 'Sleep research explained' })} />)
    expect(screen.getByText('Sleep research explained')).toBeInTheDocument()
  })
})
