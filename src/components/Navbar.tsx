import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { NAV_LINKS } from '../constants/navigation'
import { MobileNavDrawer } from './MobileNavDrawer'

/**
 * Responsive top navigation bar. Shows inline links from `sm` up and collapses
 * to a hamburger + slide-in drawer on smaller screens. Owns its own open state.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
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

      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
