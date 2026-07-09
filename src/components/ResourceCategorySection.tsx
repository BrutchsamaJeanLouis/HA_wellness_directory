import { useId } from 'react'
import { Box, Typography } from '@mui/material'
import type { Resource, ResourceCategory } from '../types'
import { ResourceGrid } from './ResourceGrid'

interface ResourceCategorySectionProps {
  category: ResourceCategory
  resources: Resource[]
}

/** A single category group: a heading followed by that category's card grid. */
export function ResourceCategorySection({
  category,
  resources,
}: ResourceCategorySectionProps) {
  const headingId = useId()

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ mb: { xs: 4, sm: 5 } }}>
      <Typography
        id={headingId}
        variant="h5"
        component="h2"
        sx={{ fontWeight: 700, mb: { xs: 1.5, sm: 2 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        {category}
      </Typography>
      <ResourceGrid resources={resources} />
    </Box>
  )
}
