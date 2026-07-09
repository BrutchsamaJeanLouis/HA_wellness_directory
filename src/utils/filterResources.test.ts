import { filterResources } from './filterResources'
import { makeResource } from '../test/fixtures'

describe('filterResources', () => {
  const sleep = makeResource({
    id: '1',
    title: 'The Science of Sleep',
    tags: ['wellbeing', 'sleep', 'science'],
  })
  const smoothie = makeResource({
    id: '2',
    title: 'Energy Boost Smoothie',
    tags: ['nutrition', 'energy'],
  })
  const resources = [sleep, smoothie]

  it('returns all resources when the query is empty', () => {
    expect(filterResources(resources, '')).toEqual(resources)
  })

  it('returns all resources when the query is only whitespace', () => {
    expect(filterResources(resources, '   ')).toEqual(resources)
  })

  it('matches on the title, case-insensitively', () => {
    expect(filterResources(resources, 'sleep')).toEqual([sleep])
    expect(filterResources(resources, 'SCIENCE OF')).toEqual([sleep])
  })

  it('matches on a partial title', () => {
    expect(filterResources(resources, 'smoo')).toEqual([smoothie])
  })

  it('matches on any tag', () => {
    expect(filterResources(resources, 'nutrition')).toEqual([smoothie])
  })

  it('ignores surrounding whitespace in the query', () => {
    expect(filterResources(resources, '  energy  ')).toEqual([smoothie])
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterResources(resources, 'nonexistent')).toEqual([])
  })

  it('preserves the input order of matching resources', () => {
    // "e" appears in both titles/tags; order should follow the input.
    expect(filterResources(resources, 'e')).toEqual([sleep, smoothie])
  })
})
