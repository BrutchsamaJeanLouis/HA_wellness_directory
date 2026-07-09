import { render, screen } from '@testing-library/react'
import { ResourceGrid } from './ResourceGrid'
import { makeResource } from '../test/fixtures'

describe('ResourceGrid', () => {
  it('renders one card per resource', () => {
    const resources = [
      makeResource({ id: '1', title: 'One' }),
      makeResource({ id: '2', title: 'Two' }),
      makeResource({ id: '3', title: 'Three' }),
    ]
    render(<ResourceGrid resources={resources} />)

    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Two' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Three' })).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders no cards when the list is empty', () => {
    render(<ResourceGrid resources={[]} />)
    expect(screen.queryAllByRole('img')).toHaveLength(0)
  })
})
