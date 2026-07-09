import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { NAV_LINKS } from '../constants/navigation'

interface MobileNavDrawerProps {
  open: boolean
  onClose: () => void
}

/** Slide-in navigation drawer shown on small screens (hidden at `sm` and up). */
export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
        <IconButton aria-label="close navigation menu" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {NAV_LINKS.map((link) => (
          <ListItem key={link} disablePadding>
            <ListItemButton onClick={onClose}>
              <ListItemText primary={link} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ px: 2, pt: 1 }}>
        <Button variant="contained" fullWidth onClick={onClose}>
          Submit
        </Button>
      </Box>
    </Drawer>
  )
}
