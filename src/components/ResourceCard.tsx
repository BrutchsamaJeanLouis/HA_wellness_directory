import { Box, Chip, Paper, Typography } from '@mui/material'
import type { Resource } from '../types'

interface ResourceCardProps {
  resource: Resource
}

/** Single resource tile: thumbnail, category/duration meta, title and blurb. */
export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        height: '100%',
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
    </Paper>
  )
}
