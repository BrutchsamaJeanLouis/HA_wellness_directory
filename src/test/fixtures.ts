import type { Resource } from '../types'

/** Build a Resource for tests, overriding only the fields a case cares about. */
export function makeResource(overrides: Partial<Resource> = {}): Resource {
  return {
    id: '001',
    category: 'Podcasts',
    title: 'Mindful Moments',
    thumbnail: 'https://example.com/thumb.jpg',
    tags: ['mindfulness'],
    duration: 25,
    description: 'A calming podcast focused on mindfulness techniques for daily life.',
    date_uploaded: '2025-07-10',
    ...overrides,
  }
}
