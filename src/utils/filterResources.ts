import type { Resource } from '../types'

/**
 * Filters resources by a free-text query, matching case-insensitively against
 * the title and tags. An empty or whitespace-only query returns all resources.
 * Input order is preserved.
 */
export function filterResources(resources: Resource[], query: string): Resource[] {
  const needle = query.trim().toLowerCase()
  if (needle === '') return resources

  return resources.filter((resource) => {
    const haystacks = [resource.title, ...resource.tags]
    return haystacks.some((value) => value.toLowerCase().includes(needle))
  })
}
