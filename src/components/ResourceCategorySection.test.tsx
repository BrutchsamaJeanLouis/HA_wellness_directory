import { render, screen, within } from '@testing-library/react'
import { ResourceCategorySection } from './ResourceCategorySection'
import { makeResource } from '../test/fixtures'

describe('ResourceCategorySection', () => {
  it('renders the category name as a heading', () => {
    render(
      <ResourceCategorySection
        category="Podcasts"
        resources={[makeResource({ id: '1', category: 'Podcasts' })]}
      />,
    )
    expect(screen.getByRole('heading', { name: 'Podcasts' })).toBeInTheDocument()
  })

  it('renders a card for each resource in the group', () => {
    const resources = [
      makeResource({ id: '1', category: 'Articles', title: 'First' }),
      makeResource({ id: '2', category: 'Articles', title: 'Second' }),
    ]
    render(<ResourceCategorySection category="Articles" resources={resources} />)

    expect(screen.getByRole('heading', { name: 'First' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Second' })).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('exposes the section as a labelled region for accessibility', () => {
    render(
      <ResourceCategorySection
        category="Meditation"
        resources={[makeResource({ id: '1', category: 'Meditation' })]}
      />,
    )
    const region = screen.getByRole('region', { name: 'Meditation' })
    expect(within(region).getByRole('heading', { name: 'Meditation' })).toBeInTheDocument()
  })
})
