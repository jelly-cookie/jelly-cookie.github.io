import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: isMobile ? 2 : 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            fontWeight: 600,
            color: theme.palette.primary.main,
            textShadow: '0 0 1px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.5)',
            letterSpacing: '0.5px',
          }}
        >
          Jelly Financial
        </Typography>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.common.white, 0.05),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.1),
            },
            width: isMobile ? '100%' : '300px',
            ml: isMobile ? 2 : 0,
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center',
            pl: 2 
          }}>
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </Box>
          <InputBase
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              width: '100%',
              pl: 5,
              pr: searchQuery ? 5 : 2,
              py: 1,
              color: 'inherit',
              '& .MuiInputBase-input': {
                transition: theme.transitions.create('width'),
              },
            }}
          />
          {searchQuery && (
            <IconButton
              size="small"
              onClick={clearSearch}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
