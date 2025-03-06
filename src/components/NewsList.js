import React from 'react';
import { List, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import NewsItem from './NewsItem';

function NewsList({ news }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!news.length) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 4,
          p: 3,
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No news found
        </Typography>
      </Box>
    );
  }

  return (
    <List 
      sx={{ 
        width: '100%', 
        bgcolor: 'transparent',
        p: 0,
        '& > *:not(:last-child)': {
          mb: isMobile ? 1 : 2,
        },
      }}
    >
      {news.map((item, index) => (
        <NewsItem key={index} news={item} />
      ))}
    </List>
  );
}

export default NewsList;
