import React, { useState, useEffect } from 'react';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#C33764',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

// Define types for our data
interface GiftSpot {
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  priceRange: string;
  giftIdeas: string[];
  website: string;
  popularityTag?: string;
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
  },
  {
    name: 'Southern Methodist University',
    hotspots: [
      {
        name: 'Goodbye Horses',
        description: 'Trendy nightlife spot popular with the SMU crowd for drinks and socializing.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://goodbyehorsestx.com/',
        popularityTag: 'Greek Life Favorite'
      },
      {
        name: 'Theory',
        description: 'Upscale nightclub and bar with a sophisticated atmosphere in uptown Dallas.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$$',
        giftIdeas: ['Gift Cards', 'VIP Experiences'],
        website: 'https://www.theoryuptown.com/',
        popularityTag: 'Greek Life Favorite'
      },
      {
        name: 'Barley House',
        description: 'Sports bar and grill with a lively atmosphere and great game day experience.',
        category: 'Food & Sports',
        icon: <SportsBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Sports Merchandise'],
        website: 'http://www.barleyhouse.com/'
      },
      {
        name: 'Komodo',
        description: 'Upscale Asian fusion restaurant and lounge with creative cocktails and sushi.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$$$',
        giftIdeas: ['Gift Cards', 'Dining Experiences'],
        website: 'https://komodorestaurant.com/'
      },
      {
        name: 'Shugs',
        description: 'Popular bagel shop known for fresh bagels and breakfast favorites among students.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://shugsbagels.com/',
        popularityTag: 'Greek Life Favorite'
      },
      {
        name: 'Old Monk',
        description: 'Cozy neighborhood bar with craft cocktails and a relaxed atmosphere.',
        category: 'Entertainment',
        icon: <LocalBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.facebook.com/OldMonkDallas'
      }
    ]
  },
  {
    name: 'Michigan State University',
    hotspots: [
      {
        name: 'Rick\'s American Café',
        description: 'Legendary East Lansing nightclub and bar, a staple of MSU nightlife for decades.',
        category: 'Entertainment',
        icon: <NightlifeIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.ricksamericancafe.com/east-lansing'
      },
      {
        name: 'Harper\'s',
        description: 'Popular brewpub and restaurant with craft beer and great food near campus.',
        category: 'Food & Dining',
        icon: <LocalBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Beer Merchandise'],
        website: 'https://www.harpersbrewpub.com/'
      },
      {
        name: 'Dublin Square Irish Pub',
        description: 'Authentic Irish pub with live music, traditional food, and a great atmosphere.',
        category: 'Food & Dining',
        icon: <LocalBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Irish Merchandise'],
        website: 'https://www.facebook.com/dublinsquare/'
      },
      {
        name: 'Lou & Harry\'s',
        description: 'Sports bar and grill known for great burgers and game day atmosphere.',
        category: 'Food & Sports',
        icon: <SportsBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Sports Merchandise'],
        website: 'https://louhas.com/1429-west-saginaw/'
      }
    ]
  },
  {
    name: 'University of California, Santa Barbara',
    hotspots: [
      {
        name: 'Lao Wangs',
        description: 'Popular street food spot serving authentic Asian cuisine, perfect for late-night cravings.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'T-shirts'],
        website: 'https://www.laowangstreetfood.com/'
      },
      {
        name: 'Sharkeez Mexican Restaurant & Bar',
        description: 'Lively Mexican restaurant and bar with great margaritas and beachside vibes.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.sharkeez.com/',
        popularityTag: 'APhi Favorite'
      }
    ]
  },
  {
    name: 'Dartmouth College',
    hotspots: [
      {
        name: 'Molly\'s Restaurant & Bar',
        description: 'Classic Hanover establishment with great food and a welcoming atmosphere for students.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Merchandise'],
        website: 'https://www.mollysrestaurant.com/'
      },
      {
        name: 'Han Fusion',
        description: 'Modern Asian fusion restaurant offering creative dishes and fresh flavors.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Dining Experiences'],
        website: 'https://hanfusionnh.com/'
      },
      {
        name: 'Lou\'s Restaurant & Bakery',
        description: 'Beloved local bakery and restaurant, a Hanover institution serving comfort food.',
        category: 'Food & Dining',
        icon: <RestaurantIcon />,
        priceRange: '$',
        giftIdeas: ['Gift Cards', 'Baked Goods'],
        website: 'https://lousrestaurant.com/'
      }
    ]
  },
  {
    name: 'Bowdoin College',
    hotspots: [
      {
        name: 'Bolos',
        description: 'Popular Brunswick restaurant and bar known for great food and lively sports atmosphere.',
        category: 'Food & Sports',
        icon: <SportsBarIcon />,
        priceRange: '$$',
        giftIdeas: ['Gift Cards', 'Sports Merchandise'],
        website: 'https://www.bolosbrunswick.com/home',
        popularityTag: 'Sports Team Favorite'
      }
    ]
  }
];

type PageType = 'home' | 'colleges' | 'about' | 'student-scoop';

// Custom SVG logo for Loop'd with infinity symbol replacing the "oo"
const LoopdLogo = ({ size = 64 }: { size?: number }) => (
  <Typography
    sx={{
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 700,
      fontSize: size * 0.6,
      color: 'white',
      textShadow: '0 2px 8px rgba(0,0,0,0.2)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      display: 'block'
    }}
  >
    Loop'd
  </Typography>
);

const MinimalNav = ({ onNav, currentPage }: { onNav: (page: PageType) => void, currentPage: PageType }) => (
  <Box sx={{ 
    width: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    px: { xs: 3, sm: 6 }, 
    py: { xs: 2, sm: 3 }, 
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(195, 55, 100, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  }}>
    <Box sx={{ 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }} onClick={() => onNav('home')}>
      <LoopdLogo size={32} />
    </Box>
    <Box sx={{ 
      display: 'flex', 
      gap: { xs: 2, sm: 4 },
      alignItems: 'center'
    }}>
      {(['colleges', 'about', 'student-scoop'] as const).map((page) => (
        <Typography 
          key={page}
          sx={{ 
            color: currentPage === page ? '#F8FFAE' : 'rgba(255,255,255,0.9)', 
            fontWeight: currentPage === page ? 700 : 600, 
            fontSize: { xs: 14, sm: 16 }, 
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            position: 'relative',
            '&:hover': {
              color: '#F8FFAE',
              transform: 'translateY(-1px)'
            },
            '&::after': currentPage === page ? {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              right: 0,
              height: 2,
              background: '#F8FFAE',
              borderRadius: 1
            } : {}
          }} 
          onClick={() => onNav(page)}
        >
          {page === 'student-scoop' ? 'Student Scoop' : page.charAt(0).toUpperCase() + page.slice(1)}
        </Typography>
      ))}
    </Box>
  </Box>
);

const getGiftIcon = (giftType: string) => {
  if (/card/i.test(giftType)) return '🎁';
  if (/shirt|apparel|t-shirt/i.test(giftType)) return '👕';
  if (/merch|souvenir|shopping/i.test(giftType)) return '🛍️';
  if (/bbq|food|pizza|meal/i.test(giftType)) return '🍕';
  return '🎁';
};

function App() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [page, setPage] = useState<PageType>('home');

  // Scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section we're in based on scroll position
      if (scrollY < windowHeight * 0.8) {
        setPage('home');
      } else if (scrollY < windowHeight * 1.8) {
        setPage('colleges');
      } else if (scrollY < windowHeight * 2.8) {
        setPage('about');
      } else {
        setPage('student-scoop');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetPage: PageType) => {
    const windowHeight = window.innerHeight;
    let targetY = 0;
    
    switch (targetPage) {
      case 'home':
        targetY = 0;
        break;
      case 'colleges':
        targetY = windowHeight;
        break;
      case 'about':
        targetY = windowHeight * 2;
        break;
      case 'student-scoop':
        targetY = windowHeight * 3;
        break;
    }
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const HomePage = () => (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Box sx={{ mb: 4 }}>
          <LoopdLogo size={100} />
        </Box>
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            maxWidth: '900px',
            lineHeight: 1.2
          }}
        >
          Stay Loop'd In to the Hottest Campus Spots Nationwide
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.2rem' },
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Discover the best local hotspots, hidden gems, and student favorites at colleges across the country
        </Typography>
      </Box>
      <Box sx={{ 
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateX(-50%) translateY(0)'
          },
          '40%': {
            transform: 'translateX(-50%) translateY(-10px)'
          },
          '60%': {
            transform: 'translateX(-50%) translateY(-5px)'
          }
        }
      }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', mb: 1 }}>
          Scroll to explore
        </Typography>
        <Box sx={{ textAlign: 'center', fontSize: '1.5rem' }}>⬇️</Box>
      </Box>
    </Box>
  );

  const CollegesPage = () => (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      display: 'flex',
      flexDirection: 'column',
      pt: 8,
      pb: 4
    }}>
      <Container maxWidth="lg" sx={{ flex: 1, px: { xs: 2, sm: 3 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          color: 'white', 
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
          mb: 2, 
          fontWeight: 900, 
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          Explore College Loops
        </Typography>
        
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ 
            color: 'white', 
            mb: 3, 
            fontSize: { xs: '1.2rem', sm: '1.4rem' }, 
            textShadow: '0 2px 12px rgba(0,0,0,0.2)',
            fontWeight: 600
          }}>
            Choose Your School
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
                label="Search for your college..."
                variant="outlined"
                fullWidth
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.95)', 
                  borderRadius: 3, 
                  maxWidth: 600,
                  mx: 'auto',
                  input: { color: '#222', fontSize: '1.1rem' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                      borderColor: '#C33764'
                    }
                  }
                }}
              />
            )}
          />
        </Box>
        
        {selectedCollege && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: 'white', 
              fontSize: { xs: '1.5rem', sm: '2rem' }, 
              mb: 4, 
              fontWeight: 700, 
              letterSpacing: '-0.01em', 
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}>
              Popular Near {selectedCollege.name}
            </Typography>
            <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center">
              {selectedCollege.hotspots.map((spot, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card elevation={8} sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    minHeight: { xs: 220, sm: 260 }, 
                    borderRadius: 4, 
                    boxShadow: '0 8px 40px rgba(195,55,100,0.15)', 
                    bgcolor: 'rgba(255,255,255,0.98)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 50px rgba(195,55,100,0.25)'
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: 'primary.main', mr: 1.5, fontSize: 32 }}>
                          {spot.icon}
                        </Box>
                        <Typography variant="h6" component="div" sx={{ 
                          fontSize: { xs: '1.2rem', sm: '1.3rem' }, 
                          fontWeight: 700, 
                          flex: 1, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap' 
                        }}>
                          <Link 
                            href={spot.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            color="primary.main" 
                            underline="hover" 
                            sx={{ 
                              fontWeight: 700,
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#A12955'
                              }
                            }}
                          >
                            {spot.name}
                          </Link>
                        </Typography>
                        <Chip
                          label={spot.category}
                          size="small"
                          sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white', 
                            fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                            fontWeight: 600, 
                            ml: 1,
                            px: 1
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        mb: 1, 
                        fontSize: { xs: '1rem', sm: '1.05rem' }, 
                        fontWeight: 400, 
                        lineHeight: 1.6, 
                        minHeight: 42, 
                        color: '#555'
                      }}>
                        {spot.description.length > 100 ? spot.description.slice(0, 97) + '...' : spot.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                        <Typography sx={{ 
                          color: 'primary.main', 
                          fontSize: { xs: '1rem', sm: '1.1rem' }, 
                          fontWeight: 600 
                        }}>
                          {spot.priceRange}
                        </Typography>
                        <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                          {spot.giftIdeas.map((gift, idx) => (
                            <Box key={idx} sx={{ fontSize: { xs: 24, sm: 26 } }} title={gift}>
                              {getGiftIcon(gift)}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      {spot.popularityTag && (
                        <Typography variant="body2" sx={{ 
                          color: 'primary.main', 
                          fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                          fontWeight: 600,
                          mt: 1,
                          fontStyle: 'italic'
                        }}>
                          ★ Popular with {spot.popularityTag}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );

  const AboutPage = () => (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8
    }}>
      <Paper elevation={12} sx={{ 
        p: { xs: 4, sm: 6 }, 
        borderRadius: 5, 
        bgcolor: 'rgba(255,255,255,0.98)', 
        maxWidth: 700, 
        mx: 2,
        boxShadow: '0 12px 60px rgba(195,55,100,0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <Typography variant="h3" sx={{ 
          color: 'primary.main', 
          fontWeight: 900, 
          mb: 4, 
          textAlign: 'center',
          fontSize: { xs: '2rem', sm: '2.5rem' }
        }}>
          About Loop'd
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'text.secondary', 
          fontSize: { xs: '1.1rem', sm: '1.2rem' }, 
          mb: 3, 
          lineHeight: 1.8,
          textAlign: 'center'
        }}>
          Loop'd connects college students with the hottest local spots around their campus. 
          From trendy restaurants to study-friendly cafes, we help you discover the places 
          that make your college experience unforgettable.
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'text.secondary', 
          fontSize: { xs: '1.1rem', sm: '1.2rem' }, 
          mb: 3, 
          lineHeight: 1.8,
          textAlign: 'center'
        }}>
          Whether you're looking for the perfect date spot, a place to grab lunch between classes, 
          or somewhere to celebrate with friends, Loop'd has you covered with insider recommendations 
          from students who know their campus best.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" sx={{ 
            color: 'primary.main', 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.3rem' }
          }}>
            Stay Loop'd In! 🎓
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  const StudentScoopPage = () => (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #C33764 0%, #F8FFAE 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8
    }}>
      <Paper elevation={12} sx={{ 
        p: { xs: 4, sm: 6 }, 
        borderRadius: 5, 
        bgcolor: 'rgba(255,255,255,0.98)', 
        maxWidth: 800, 
        mx: 2,
        boxShadow: '0 12px 60px rgba(195,55,100,0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <Typography variant="h3" sx={{ 
          color: 'primary.main', 
          fontWeight: 900, 
          mb: 4, 
          textAlign: 'center',
          fontSize: { xs: '2rem', sm: '2.5rem' }
        }}>
          Student Scoop
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'text.secondary', 
          fontSize: { xs: '1.1rem', sm: '1.2rem' }, 
          mb: 3, 
          textAlign: 'center',
          lineHeight: 1.8
        }}>
          Share your favorite campus hotspots and help us build the ultimate college experience guide!
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'text.secondary', 
          fontSize: { xs: '1rem', sm: '1.1rem' }, 
          mb: 4, 
          textAlign: 'center',
          lineHeight: 1.7
        }}>
          Know an amazing spot that other students are missing out on? Have a favorite study cafe or 
          late-night food joint? We want to hear about it! Your recommendations help fellow students 
          discover the best their campus has to offer.
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            p: 3, 
            borderRadius: 3,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
            minWidth: 280,
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 30px rgba(195, 55, 100, 0.4)',
              bgcolor: '#A12955'
            }
          }} 
          component="a" 
          href="https://forms.gle/GvfaE8UyrSg5Eqv6A" 
          target="_blank" 
          rel="noopener noreferrer">
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              mb: 1
            }}>
              📝 Share Your Favorite Spots
            </Typography>
            <Typography variant="body2" sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem' },
              opacity: 0.9
            }}>
              Fill out our quick form
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary', 
          fontSize: { xs: '0.9rem', sm: '1rem' }, 
          textAlign: 'center',
          fontStyle: 'italic',
          opacity: 0.8
        }}>
          Help your fellow students discover amazing spots around campus! 🌟
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        scrollBehavior: 'smooth'
      }}>
        <MinimalNav onNav={scrollToSection} currentPage={page} />
        
        {/* Home Section */}
        <Box id="home-section">
          <HomePage />
        </Box>
        
        {/* Colleges Section */}
        <Box id="colleges-section">
          <CollegesPage />
        </Box>
        
        {/* About Section */}
        <Box id="about-section">
          <AboutPage />
        </Box>
        
        {/* Student Scoop Section */}
        <Box id="student-scoop-section">
          <StudentScoopPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 