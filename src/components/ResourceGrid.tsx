import { Box } from '@mui/material'
import type { Resource } from '../types'
import { ResourceCard } from './ResourceCard'

interface ResourceGridProps {
  resources: Resource[]
}

/**
 * Responsive card grid: a single full-width column on mobile, then auto-fitting
 * fixed-width tracks that are centred as a group — so a lone card (or a partial
 * final row) sits in the middle rather than hugging the left edge.
 */
export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, sm: 2.5, md: 3 },
        justifyContent: 'center',
        // xs: one full-width column (minmax(0, 1fr) so cards can't overflow the
        // gutter via their min-content). sm+: as many ~280–340px tracks as fit,
        // collapsing empty tracks (auto-fit) and centred via justifyContent.
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          sm: 'repeat(auto-fit, minmax(280px, 340px))',
        },
      }}
    >
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </Box>
  )
}
