import React from 'react';
import { Box, Typography, Chip, Paper, Divider } from '@mui/material';

const NewsDetail = ({ news, onClose }) => {
  if (!news) return null;

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
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        bgcolor: '#1E1E1E',
        color: '#fff',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      {news.banner_image && (
        <Box 
          component="img" 
          src={news.banner_image} 
          alt={news.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 1,
            mb: 3
          }}
        />
      )}

      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#90caf9' }}>
        {news.translatedTitle || news.title}
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          {news.source} • {formatDate(news.time_published)}
        </Typography>
        {news.authors && news.authors.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            • {news.authors.join(', ')}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Chip
          label={news.overall_sentiment_label}
          sx={{
            bgcolor: getSentimentColor(news.overall_sentiment_label),
            color: '#fff',
            '&:hover': {
              bgcolor: getSentimentColor(news.overall_sentiment_label),
            }
          }}
        />
      </Box>

      <Typography variant="body1" paragraph sx={{ color: '#ccc' }}>
        {news.summary}
      </Typography>

      <Divider sx={{ my: 3, bgcolor: '#333' }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#90caf9' }}>
          관련 주제
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {news.topics.map((topic, index) => (
            <Chip
              key={index}
              label={topic.topic}
              sx={{
                bgcolor: '#333',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#444',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {news.ticker_sentiment && news.ticker_sentiment.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: '#90caf9' }}>
            관련 종목
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {news.ticker_sentiment.map((ticker, index) => (
              <Chip
                key={index}
                label={`${ticker.ticker} (${ticker.ticker_sentiment_label})`}
                sx={{
                  bgcolor: '#333',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#444',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography
          component="a"
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#90caf9',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          원문 보기 →
        </Typography>
      </Box>
    </Paper>
  );
};

export default NewsDetail; 