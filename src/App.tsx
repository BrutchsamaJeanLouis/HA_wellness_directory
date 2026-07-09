import { useState } from 'react'
import {
  AppBar,
  Box,
  Container,
  Divider,
  Paper,
  Toolbar,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import type { Resource } from './types'
import { RESOURCES } from './data'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Wellness Directory
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button color="inherit">Browse</Button>
              <Button color="inherit">Categories</Button>
              <Button variant="contained">Submit</Button>
            </Box>
            <Button
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <MenuIcon />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile nav drawer (inline) */}
      {mobileOpen && (
        <Paper sx={{ display: { xs: 'block', sm: 'none' }, p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button>Browse</Button>
            <Button>Categories</Button>
            <Divider />
            <Button variant="contained" fullWidth>Submit</Button>
          </Box>
        </Paper>
      )}

      {/* Main content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Explore Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Curated wellness content - podcasts, articles, recipes, and more.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {RESOURCES.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Divider />
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Wellness Directory
        </Typography>
      </Box>
    </Box>
  )
}

/* Resource card */
function ResourceCard({ resource }: { resource: Resource }) {
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
      }}
    >
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'grey.200',
        }}
      >
        <img
          src={resource.thumbnail}
          alt={resource.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

export default App
