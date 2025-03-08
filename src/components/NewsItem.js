import React from 'react';
import { ListItem, Typography, Box, Chip, IconButton, Paper, useTheme, useMediaQuery } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import dayjs from 'dayjs';

function NewsItem({ news }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatTime = (timeStr) => {
    return dayjs(timeStr, 'YYYYMMDDTHHmmss').format('HH:mm MMM DD');
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Bullish':
        return '#4caf50';
      case 'Somewhat-Bullish':
        return '#81c784';
      case 'Bearish':
        return '#f44336';
      case 'Somewhat-Bearish':
        return '#e57373';
      default:
        return '#9e9e9e';
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: news.translatedTitle || news.title,
          text: `${news.translatedTitle || news.title} - ${news.source}`,
          url: news.url
        });
      } else {
        await navigator.clipboard.writeText(news.url);
        // You might want to add a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleClick = () => {
    window.open(news.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s, background-color 0.2s',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <ListItem
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: isMobile ? 2 : 3,
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
          {news.banner_image ? (
            <Box
              component="img"
              src={news.banner_image}
              alt={news.source}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                mr: 2,
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              mr: 2,
              bgcolor: 'rgba(144, 202, 249, 0.08)',
              display: news.banner_image ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NewspaperIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.4,
                mb: 1,
              }}
            >
              {news.translatedTitle || news.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatTime(news.time_published)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news.source}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleShare}
            sx={{
              width: 32,
              height: 32,
              ml: 2,
              bgcolor: 'rgba(144, 202, 249, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(144, 202, 249, 0.12)',
              },
            }}
          >
            <ShareIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
          <Chip
            label={news.overall_sentiment_label}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              height: 24,
              bgcolor: `${getSentimentColor(news.overall_sentiment_label)}15`,
              color: getSentimentColor(news.overall_sentiment_label),
              border: `1px solid ${getSentimentColor(news.overall_sentiment_label)}`,
              fontWeight: 600,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {news.topics && news.topics.map((topic, index) => (
              <Chip
                key={index}
                label={typeof topic === 'string' ? topic : topic.topic}
                size="small"
                sx={{
                  height: 24,
                  bgcolor: 'rgba(144, 202, 249, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(144, 202, 249, 0.12)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </ListItem>
    </Paper>
  );
}

export default NewsItem;
