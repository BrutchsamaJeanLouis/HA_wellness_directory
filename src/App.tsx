import { useState } from 'react'
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import type { Resource } from './types'
import { RESOURCES } from './data'

const NAV_LINKS = ['Browse', 'Categories']

/* ── App ── */

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeDrawer = () => setMobileOpen(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}
            >
              Wellness Directory
            </Typography>

            {/* Desktop nav — hidden below sm */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Button key={link} color="inherit">
                  {link}
                </Button>
              ))}
              <Button variant="contained">Submit</Button>
            </Box>

            {/* Hamburger — shown only below sm */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open navigation menu"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile navigation drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 320,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton aria-label="close navigation menu" onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link} disablePadding>
              <ListItemButton onClick={closeDrawer}>
                <ListItemText primary={link} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 2, pt: 1 }}>
          <Button variant="contained" fullWidth onClick={closeDrawer}>
            Submit
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{ flex: 1, py: { xs: 3, sm: 4 } }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}
        >
          Explore Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, sm: 3 } }}>
          Curated wellness content - podcasts, articles, recipes, and more.
        </Typography>

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
          {RESOURCES.map((r) => (
            <ResourceCardItem key={r.id} resource={r} />
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

/* ── Resource card item ── */

function ResourceCardItem({ resource }: { resource: Resource }) {
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

export default App
