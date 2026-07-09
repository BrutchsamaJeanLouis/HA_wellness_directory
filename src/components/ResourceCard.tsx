import { useState } from 'react'
import { Box, Chip, Paper, Typography } from '@mui/material'
import type { Resource } from '../types'
import { ResourceDetailDialog } from './ResourceDetailDialog'

interface ResourceCardProps {
  resource: Resource
}

/** The brief caps the number of tags shown per resource. */
const MAX_TAGS = 3

/** Single resource tile: thumbnail, category/duration meta, title and blurb.
 *  Clicking (or activating via keyboard) opens the full-detail dialog. */
export function ResourceCard({ resource }: ResourceCardProps) {
  const [detailOpen, setDetailOpen] = useState(false)
  const openDetail = () => setDetailOpen(true)

  return (
    <>
      <Paper
        elevation={0}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`View details for ${resource.title}`}
        onClick={openDetail}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openDetail()
          }
        }}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          height: '100%',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease',
          '&:hover': {
            boxShadow: 6,
            borderColor: 'primary.main',
            transform: 'translateY(-4px)',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: 'grey.200',
          }}
        >
          <img
            src={resource.thumbnail}
            alt={resource.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip label={resource.category} size="small" variant="outlined" />
          <Typography variant="caption" color="text.secondary">
            {resource.duration} min
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
          {resource.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {resource.description}
        </Typography>
        {resource.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
            {resource.tags.slice(0, MAX_TAGS).map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        )}
      </Paper>
      <ResourceDetailDialog
        resource={resource}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  )
}
