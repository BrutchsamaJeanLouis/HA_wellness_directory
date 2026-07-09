import { groupByCategory, CATEGORY_ORDER } from './groupByCategory'
import { makeResource } from '../test/fixtures'

describe('groupByCategory', () => {
  it('returns no groups for an empty list', () => {
    expect(groupByCategory([])).toEqual([])
  })

  it('groups a single resource under its category', () => {
    const resource = makeResource({ id: '1', category: 'Podcasts' })

    expect(groupByCategory([resource])).toEqual([
      { category: 'Podcasts', resources: [resource] },
    ])
  })

  it('collects multiple resources of the same category into one group', () => {
    const first = makeResource({ id: '1', category: 'Articles', title: 'First' })
    const second = makeResource({ id: '2', category: 'Articles', title: 'Second' })

    const groups = groupByCategory([first, second])

    expect(groups).toHaveLength(1)
    expect(groups[0]).toEqual({ category: 'Articles', resources: [first, second] })
  })

  it('preserves input order of resources within a group', () => {
    const a = makeResource({ id: '1', category: 'Recipes', title: 'A' })
    const b = makeResource({ id: '2', category: 'Recipes', title: 'B' })

    const [group] = groupByCategory([b, a])

    expect(group.resources.map((r) => r.title)).toEqual(['B', 'A'])
  })

  it('orders groups by the canonical category order, not input order', () => {
    const meditation = makeResource({ id: '1', category: 'Meditation' })
    const podcast = makeResource({ id: '2', category: 'Podcasts' })
    const article = makeResource({ id: '3', category: 'Articles' })

    const categories = groupByCategory([meditation, podcast, article]).map((g) => g.category)

    expect(categories).toEqual(['Podcasts', 'Articles', 'Meditation'])
  })

  it('omits categories that have no resources', () => {
    const podcast = makeResource({ id: '1', category: 'Podcasts' })

    const categories = groupByCategory([podcast]).map((g) => g.category)

    expect(categories).toEqual(['Podcasts'])
    expect(categories).not.toContain('Fitness')
  })

  it('exposes the full category order defined by the brief', () => {
    expect(CATEGORY_ORDER).toEqual([
      'Podcasts',
      'Articles',
      'Newsletters',
      'Recipes',
      'Fitness',
      'Meditation',
    ])
  })
})
