import { useMemo, useState } from 'react'
import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Navbar, ResourceCategorySection, Footer } from './components'
import { RESOURCES } from './data'
import { groupByCategory } from './utils/groupByCategory'
import { filterResources } from './utils/filterResources'

function App() {
  const [query, setQuery] = useState('')

  const groups = useMemo(
    () => groupByCategory(filterResources(RESOURCES, query)),
    [query],
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Main content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', sm: '2.375rem' }, textAlign: 'center' }}
        >
          Explore Resources
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: { xs: 3, sm: 4 }, textAlign: 'center' }}
        >
          Curated wellness content — podcasts, articles, recipes, and more.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, sm: 5 } }}>
          <TextField
            label="Search resources"
            placeholder="Search by title or tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {groups.length > 0 ? (
          groups.map((group) => (
            <ResourceCategorySection
              key={group.category}
              category={group.category}
              resources={group.resources}
            />
          ))
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No resources match &ldquo;{query.trim()}&rdquo;.
          </Typography>
        )}
      </Container>

      <Footer />
    </Box>
  )
}

export default App
