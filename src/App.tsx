import { Box, Container, Typography } from '@mui/material'
import { Navbar, ResourceCategorySection, Footer } from './components'
import { RESOURCES } from './data'
import { groupByCategory } from './utils/groupByCategory'

function App() {
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

        {groupByCategory(RESOURCES).map((group) => (
          <ResourceCategorySection
            key={group.category}
            category={group.category}
            resources={group.resources}
          />
        ))}
      </Container>

      <Footer />
    </Box>
  )
}

export default App
