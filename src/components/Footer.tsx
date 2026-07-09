import { Box, Divider, Typography } from '@mui/material'

/** Page footer with a top divider and copyright line. */
export function Footer() {
  return (
    <>
      <Divider />
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Wellness Directory
        </Typography>
      </Box>
    </>
  )
}
