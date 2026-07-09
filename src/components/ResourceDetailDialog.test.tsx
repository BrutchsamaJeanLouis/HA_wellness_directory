import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResourceDetailDialog } from './ResourceDetailDialog'
import { makeResource } from '../test/fixtures'

describe('ResourceDetailDialog', () => {
  it('renders nothing when closed', () => {
    render(<ResourceDetailDialog resource={makeResource()} open={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the full resource details when open', () => {
    render(
      <ResourceDetailDialog
        open
        onClose={() => {}}
        resource={makeResource({
          title: 'The Science of Sleep',
          category: 'Articles',
          tags: ['wellbeing', 'sleep', 'science'],
          duration: 8,
          description: 'Explore the latest research on how sleep affects health.',
          date_uploaded: '2025-06-22',
        })}
      />,
    )

    const dialog = screen.getByRole('dialog')
    expect(
      within(dialog).getByRole('heading', { name: 'The Science of Sleep' }),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('Articles')).toBeInTheDocument()
    expect(within(dialog).getByText('wellbeing')).toBeInTheDocument()
    expect(within(dialog).getByText('sleep')).toBeInTheDocument()
    expect(within(dialog).getByText('science')).toBeInTheDocument()
    expect(within(dialog).getByText(/8\s*min/)).toBeInTheDocument()
    expect(
      within(dialog).getByText('Explore the latest research on how sleep affects health.'),
    ).toBeInTheDocument()
    expect(within(dialog).getByText(/22 June 2025/)).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    render(<ResourceDetailDialog resource={makeResource()} open onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
