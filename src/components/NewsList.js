import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Grid,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NewsDetail from './NewsDetail';

const NewsList = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const formatDate = (timePublished) => {
    const date = new Date(timePublished.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Bullish':
        return '#4caf50';
      case 'Somewhat-Bullish':
        return '#8bc34a';
      case 'Neutral':
        return '#ff9800';
      case 'Somewhat-Bearish':
        return '#f44336';
      case 'Bearish':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#1E1E1E',
                color: '#fff',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
              onClick={() => setSelectedNews(item)}
            >
              {item.banner_image && (
                <Box
                  component="img"
                  src={item.banner_image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    color: '#90caf9',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.translatedTitle || item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ color: '#888' }}
                >
                  {item.source} • {formatDate(item.time_published)}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={item.overall_sentiment_label}
                    size="small"
                    sx={{
                      bgcolor: getSentimentColor(item.overall_sentiment_label),
                      color: '#fff',
                      '&:hover': {
                        bgcolor: getSentimentColor(item.overall_sentiment_label),
                      }
                    }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#ccc',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.summary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#121212',
            color: '#fff',
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => setSelectedNews(null)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#fff',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedNews && <NewsDetail news={selectedNews} onClose={() => setSelectedNews(null)} />}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsList;
