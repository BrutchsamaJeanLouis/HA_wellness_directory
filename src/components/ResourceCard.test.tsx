import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it("renders the resource's tags", () => {
    render(
      <ResourceCard
        resource={makeResource({ tags: ['wellbeing', 'mindfulness', 'relaxation'] })}
      />,
    )
    expect(screen.getByText('wellbeing')).toBeInTheDocument()
    expect(screen.getByText('mindfulness')).toBeInTheDocument()
    expect(screen.getByText('relaxation')).toBeInTheDocument()
  })

  it('renders no more than 3 tags even when more are supplied', () => {
    render(
      <ResourceCard
        resource={makeResource({ tags: ['one', 'two', 'three', 'four', 'five'] })}
      />,
    )
    expect(screen.getByText('one')).toBeInTheDocument()
    expect(screen.getByText('two')).toBeInTheDocument()
    expect(screen.getByText('three')).toBeInTheDocument()
    expect(screen.queryByText('four')).not.toBeInTheDocument()
    expect(screen.queryByText('five')).not.toBeInTheDocument()
  })

  it('opens a details dialog with the upload date when clicked', async () => {
    render(
      <ResourceCard resource={makeResource({ title: 'Deep Focus', date_uploaded: '2025-06-22' })} />,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /view details for Deep Focus/i }))

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByText(/22 June 2025/)).toBeInTheDocument()
  })
})
