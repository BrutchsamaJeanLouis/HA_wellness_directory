import type { Resource, ResourceCategory } from '../types'

/** A category paired with the resources that belong to it. */
export interface ResourceGroup {
  category: ResourceCategory
  resources: Resource[]
}

/** Canonical display order of categories, as listed in the brief. */
export const CATEGORY_ORDER: ResourceCategory[] = [
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
]

/**
 * Groups resources by their category.
 *
 * Groups are returned in {@link CATEGORY_ORDER}, resource order within each
 * group is preserved, and categories with no resources are omitted.
 */
export function groupByCategory(resources: Resource[]): ResourceGroup[] {
  const byCategory = new Map<ResourceCategory, Resource[]>()

  for (const resource of resources) {
    const group = byCategory.get(resource.category)
    if (group) {
      group.push(resource)
    } else {
      byCategory.set(resource.category, [resource])
    }
  }

  return CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
    category,
    resources: byCategory.get(category)!,
  }))
}
