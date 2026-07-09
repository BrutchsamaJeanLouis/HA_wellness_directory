import { useMemo, useState } from 'react'
import { Box, Container, TextField, Typography } from '@mui/material'
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
          sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}
        >
          Explore Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, sm: 3 } }}>
          Curated wellness content - podcasts, articles, recipes, and more.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, sm: 4 } }}>
          <TextField
            label="Search resources"
            placeholder="Search by title or tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ width: '100%', maxWidth: 480 }}
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
