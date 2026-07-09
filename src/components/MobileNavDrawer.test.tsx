import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileNavDrawer } from './MobileNavDrawer'

describe('MobileNavDrawer', () => {
  it('shows the nav links and submit action when open', () => {
    render(<MobileNavDrawer open onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Browse' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Categories' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible()
  })

  it('calls onClose when a nav link is selected', async () => {
    const onClose = vi.fn()
    render(<MobileNavDrawer open onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: 'Browse' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    render(<MobileNavDrawer open onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: /close navigation menu/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
