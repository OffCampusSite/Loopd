import React, { useState, ReactNode } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  Chip,
  Paper,
  Link,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SportsBarIcon from '@mui/icons-material/SportsBar';

// Define types for our data
interface GiftSpot {
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  priceRange: string;
  giftIdeas: string[];
  website: string;
}

interface College {
  name: string;
  hotspots: GiftSpot[];
}

// Sample data
const colleges: College[] = [
  {
    name: 'University of Wisconsin - Madison',
    hotspots: [
      {
        name: 'Kollege Club',
        description: 'Iconic campus bar known for its classic college atmosphere and Badger memorabilia.',
        category: 'Badger Spirit',
        icon: <LocalBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Badger T-shirts'],
        website: 'https://www.kollegeklub.com'
      },
      {
        name: 'Ian\'s Pizza',
        description: 'Famous late-night pizza spot known for unique toppings and college tradition.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.ianspizza.com'
      },
      {
        name: 'Hawks Bar and Grill',
        description: 'Sports bar with great food and game day atmosphere.',
        category: 'Food & Sports',
        icon: <SportsBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Sports Merchandise'],
        website: 'https://www.hawksbarandgrill.com'
      },
      {
        name: 'City Bar',
        description: 'Upscale sports bar with extensive menu and prime game day location.',
        category: 'Food & Sports',
        icon: <RestaurantIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Sports Merchandise'],
        website: 'https://www.citybarandgrill.com'
      },
      {
        name: 'Whiskey Jacks',
        description: 'Popular country-themed bar with live music and dancing.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.whiskeyjackssaloon.com'
      }
    ]
  },
  {
    name: 'Vanderbilt University',
    hotspots: [
      {
        name: 'Von Elrods',
        description: 'Classic Nashville bar with a rich history and great atmosphere near campus.',
        category: 'Vandy Spirit',
        icon: <LocalBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Vandy Merchandise'],
        website: 'https://www.vonelrods.com'
      },
      {
        name: 'Jason Aldean\'s Kitchen + Rooftop Bar',
        description: 'Country star\'s upscale restaurant with rooftop views and live music in downtown Nashville.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.jasonaldeans.com'
      },
      {
        name: 'Raising Cane\'s',
        description: 'Popular chicken finger restaurant with signature sauce, perfect for late-night college meals.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.raisingcanes.com'
      },
      {
        name: 'San Antonio Taco Co',
        description: 'Nashville\'s original taco spot with a unique atmosphere and authentic Mexican flavors.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.satco.com'
      }
    ]
  },
  {
    name: 'University of Chicago',
    hotspots: [
      {
        name: 'The Promontory',
        description: 'Trendy Hyde Park venue with live music, great food, and craft cocktails.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$$',
        giftIdeas: ['Gift Cards', 'Concert Tickets'],
        website: 'https://www.thepromontorychicago.com'
      },
      {
        name: 'Medici on 57th',
        description: 'Iconic campus pizza spot and coffee house, a UChicago tradition since 1946.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'Coffee Mugs'],
        website: 'https://www.medici57.com'
      },
      {
        name: 'Jimmy\'s Woodlawn Tap',
        description: 'Classic dive bar beloved by generations of UChicago students and faculty.',
        category: 'UChicago Tradition',
        icon: <LocalBarIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.jimmyswoodlawntap.com'
      },
      {
        name: 'Valois',
        description: 'Historic cafeteria-style restaurant known as "See Your Food" - a Hyde Park institution.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.valoisrestaurant.com'
      },
      {
        name: 'Seminary Co-op Bookstore',
        description: 'World-renowned academic bookstore, perfect for intellectual gifts and UChicago memorabilia.',
        category: 'Shopping',
        icon: <ShoppingBagIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'UChicago Books'],
        website: 'https://www.semcoop.com'
      }
    ]
  }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#C33764', // deep pink
    },
    secondary: {
      main: '#F8FFAE', // light yellow accent
    },
    background: {
      default: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      paper: 'rgba(255,255,255,0.95)'
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '4rem',
      letterSpacing: '-0.04em',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 32px 0 rgba(195,55,100,0.10)',
          background: 'rgba(255,255,255,0.95)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.95)',
        },
      },
    },
  },
});

const GradientBackground = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
    }}
  >
    {children}
  </Box>
);

type PageType = 'home' | 'colleges' | 'about' | 'recommendations';

// Custom SVG logo for Loop'd with infinity symbol replacing the "oo"
const LoopdLogo = ({ size = 64 }: { size?: number }) => (
  <svg
    width={size * 3.2}
    height={size}
    viewBox="0 0 320 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    {/* L */}
    <text x="0" y="75" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="70" fill="#111">L</text>
    {/* Infinity Symbol replacing "oo" */}
    <path
      d="M70 50 C70 35, 85 35, 100 50 C115 65, 130 65, 145 50 C160 35, 175 35, 175 50 C175 65, 160 65, 145 50 C130 35, 115 35, 100 50 C85 65, 70 65, 70 50 Z"
      fill="#111"
      stroke="#111"
      strokeWidth="2"
    />
    {/* p'd */}
    <text x="190" y="75" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="70" fill="#111">p</text>
    {/* Apostrophe */}
    <text x="245" y="45" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="50" fill="#111">'</text>
    {/* d */}
    <text x="270" y="75" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="70" fill="#111">d</text>
  </svg>
);

const MinimalNav = ({ onNav }: { onNav: (page: PageType) => void }) => (
  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 6 }, pt: { xs: 3, sm: 4 }, mb: { xs: 2, sm: 3 }, minHeight: { xs: 60, sm: 80 }, zIndex: 10 }}>
    <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => onNav('home')}>
      <LoopdLogo size={36} />
    </Box>
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: 16, sm: 18 }, cursor: 'pointer' }} onClick={() => onNav('colleges')}>Colleges</Typography>
      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: 16, sm: 18 }, cursor: 'pointer' }} onClick={() => onNav('about')}>About</Typography>
      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: 16, sm: 18 }, cursor: 'pointer' }} onClick={() => onNav('recommendations')}>Recommendations</Typography>
    </Box>
  </Box>
);

function getGiftIcon(gift: string) {
  if (/card/i.test(gift)) return '🎁';
  if (/shirt|apparel|t-shirt/i.test(gift)) return '👕';
  if (/merch|souvenir|shopping/i.test(gift)) return '🛍️';
  if (/bbq|food|pizza|meal/i.test(gift)) return '🍕';
  return '🎁';
}

function App() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [page, setPage] = useState<PageType>('home');

  const HomePage = () => (
    <GradientBackground>
      <MinimalNav onNav={setPage} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', width: '100%' }}>
        <Box sx={{ mb: 2, mt: { xs: 8, sm: 12 } }}>
          <LoopdLogo size={80} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 600,
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '1.2rem', sm: '1.8rem' },
            textShadow: '0 2px 12px rgba(44,62,80,0.10)',
            maxWidth: '800px',
            px: 2
          }}
        >
          Stay Loop'd In to the Hottest Campus Spots Nationwide
        </Typography>
      </Box>
    </GradientBackground>
  );

  const CollegesPage = () => (
    <GradientBackground>
      <MinimalNav onNav={setPage} />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, px: { xs: 0.5, sm: 2 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontSize: { xs: '1.4rem', sm: '2rem' }, mb: 3, fontWeight: 900, textShadow: '0 2px 12px rgba(44,62,80,0.10)' }}>
          Explore College Loops
        </Typography>
        <Typography variant="subtitle1" color="white" sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: '1rem', sm: '1.2rem' }, textShadow: '0 2px 12px rgba(44,62,80,0.10)' }}>
          Select a college to discover the best spots and gift ideas in their area
        </Typography>
        <Autocomplete
          options={colleges}
          getOptionLabel={(option) => option.name}
          value={selectedCollege}
          onChange={(event, newValue) => {
            setSelectedCollege(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a College"
              variant="outlined"
              fullWidth
              sx={{ mb: { xs: 2, sm: 4 }, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 2, input: { color: '#222' } }}
            />
          )}
        />
        {selectedCollege && (
          <Box sx={{ mt: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: '1.7rem' }, mb: 3, fontWeight: 700, letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(44,62,80,0.10)' }}>
              Popular Near {selectedCollege.name}
            </Typography>
            <Grid container spacing={{ xs: 3, sm: 4 }}>
              {selectedCollege.hotspots.map((spot, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: { xs: 200, sm: 240 }, borderRadius: 3, boxShadow: '0 4px 32px 0 rgba(195,55,100,0.13)', bgcolor: 'rgba(255,255,255,0.97)' }}>
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: 'primary.main', mr: 1, fontSize: 28 }}>
                          {spot.icon}
                        </Box>
                        <Typography variant="h6" component="div" sx={{ fontSize: { xs: '1.15rem', sm: '1.25rem' }, fontWeight: 700, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <Link href={spot.website} target="_blank" rel="noopener noreferrer" color="primary.main" underline="hover" sx={{ fontWeight: 700 }}>
                            {spot.name}
                          </Link>
                        </Typography>
                        <Chip
                          label={spot.category}
                          size="small"
                          sx={{ bgcolor: 'primary.main', color: 'white', fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 500, ml: 1 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0, fontSize: { xs: '0.97rem', sm: '1.05rem' }, fontWeight: 400, lineHeight: 1.5, minHeight: 38, color: '#6c757d' }}>
                        {spot.description.length > 90 ? spot.description.slice(0, 87) + '...' : spot.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.95rem', sm: '1.05rem' }, fontWeight: 500 }}>
                          {spot.priceRange}
                        </Typography>
                        <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                          {spot.giftIdeas.map((gift, idx) => (
                            <Box key={idx} sx={{ fontSize: { xs: 22, sm: 24 } }} title={gift}>
                              {getGiftIcon(gift)}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </GradientBackground>
  );

  const AboutPage = () => (
    <GradientBackground>
      <MinimalNav onNav={setPage} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', width: '100%' }}>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: 'white', maxWidth: 600, mt: 4 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 900, mb: 2 }}>About Loop'd</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', sm: '1.2rem' }, mb: 3 }}>
            Loop'd is your ultimate guide to the vibrant life that surrounds college campuses. We connect you with the best local spots, from iconic hangouts to hidden gems, making it easy to find the perfect gifts and experiences for any college student.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
            Whether you're exploring the college loop, looking for the perfect gift, or planning your next campus visit, Loop'd helps you discover the authentic college experience beyond the classroom.
          </Typography>
        </Paper>
      </Box>
    </GradientBackground>
  );

  const RecommendationsPage = () => (
    <GradientBackground>
      <MinimalNav onNav={setPage} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', width: '100%' }}>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, bgcolor: 'white', maxWidth: 800, mt: 4 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 900, mb: 3 }}>Get Recommendations</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', sm: '1.2rem' }, mb: 3 }}>
            Looking for the perfect gift or planning a visit to one of these college towns? We'd love to help you find the best spots and experiences!
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>How We Can Help:</Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
              • Personalized gift recommendations based on interests and budget
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
              • Custom college town itineraries for visits
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
              • Group booking assistance for special occasions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
              • Local insider tips and hidden gems
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Email us: <a href="mailto:recommendations@loopd.com" style={{ color: '#C33764', textDecoration: 'none' }}>recommendations@loopd.com</a>
          </Typography>
        </Paper>
      </Box>
    </GradientBackground>
  );

  return (
    <ThemeProvider theme={theme}>
      {page === 'home' && <HomePage />}
      {page === 'colleges' && <CollegesPage />}
      {page === 'about' && <AboutPage />}
      {page === 'recommendations' && <RecommendationsPage />}
    </ThemeProvider>
  );
}

export default App; 