import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, CircularProgress, Box, useMediaQuery } from '@mui/material';
import NewsList from './components/NewsList';
import Header from './components/Header';
import { fetchNews } from './services/api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90caf9',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data.feed || []);
        setFilteredNews(data.feed || []);
      } catch (err) {
        setError('Failed to load news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredNews(news);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = news.filter(item => {
      const titleMatch = searchTerms.every(term =>
        item.title.toLowerCase().includes(term)
      );
      const topicMatch = item.topics?.some(topic =>
        searchTerms.some(term =>
          (typeof topic === 'string' ? topic : topic.topic)
            .toLowerCase()
            .includes(term)
        )
      );
      const sourceMatch = searchTerms.some(term =>
        item.source.toLowerCase().includes(term)
      );

      return titleMatch || topicMatch || sourceMatch;
    });

    setFilteredNews(filtered);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #121212, #1a1a1a)',
      }}>
        <Header onSearch={handleSearch} />
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 2,
            px: isMobile ? 1 : 3,
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ 
              color: 'error.main', 
              textAlign: 'center', 
              mt: 4,
              p: 3,
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              borderRadius: 2,
            }}>
              {error}
            </Box>
          ) : (
            <NewsList news={filteredNews} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
