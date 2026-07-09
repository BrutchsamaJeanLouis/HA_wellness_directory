import { useId } from 'react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import type { Resource } from '../types'

interface ResourceDetailDialogProps {
  resource: Resource
  open: boolean
  onClose: () => void
}

/** Formats an ISO date (yyyy-mm-dd) as e.g. "22 June 2025", timezone-stable. */
function formatUploadDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Modal showing the full detail of a single resource, including all tags,
 *  the description and the upload date. */
export function ResourceDetailDialog({ resource, open, onClose }: ResourceDetailDialogProps) {
  const titleId = useId()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ fontWeight: 700 }}>
        {resource.title}
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: 'grey.200',
            mb: 2,
          }}
        >
          <img
            src={resource.thumbnail}
            alt={resource.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label={resource.category} size="small" variant="outlined" />
          <Typography variant="body2" color="text.secondary">
            {resource.duration} min
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {resource.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {resource.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary">
          Uploaded {formatUploadDate(resource.date_uploaded)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
