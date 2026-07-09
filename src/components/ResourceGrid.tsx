import { Box } from '@mui/material'
import type { Resource } from '../types'
import { ResourceCard } from './ResourceCard'

interface ResourceGridProps {
  resources: Resource[]
}

/** Responsive card grid: 1 column on mobile, 2 at `sm`, 3 at `md` and up. */
export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, sm: 2.5, md: 3 },
        // minmax(0, 1fr) instead of 1fr so tracks can shrink to the
        // available width — plain 1fr resolves its min to the item's
        // min-content, which lets cards overflow the container gutter.
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </Box>
  )
}
