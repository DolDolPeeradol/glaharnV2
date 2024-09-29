import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css'; // Importing the CSS file for styles

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: '#4A4E69', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      <Toolbar>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              color: '#F9F7F7',
              textTransform: 'uppercase',
              fontWeight: '500',
              transition: '0.5s',
              marginRight: 2, // Add margin to separate from the title
              '&:hover': {
                color: '#4A4E69',
                backgroundColor: '#F9F7F7',
                transition: '0.3s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: '#FF6F61',
                transform: 'translateY(-100%)',
                transition: 'transform 0.3s ease',
                zIndex: -1,
              },
              '&:hover:before': {
                transform: 'translateY(0)',
              },
            }}
          >
            Home
          </Button>
        </motion.div>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#F9F7F7', letterSpacing: '1.5px' }}>
          GlaHarn
        </Typography>
        {['/checkbill', '/summary', '/statusdebtor'].map((path, index) => {
          const pageName = path.slice(1).charAt(0).toUpperCase() + path.slice(2);
          return (
            <motion.div key={index} whileHover={{ scale: 1.1 }}>
              <Button
                color="inherit"
                onClick={() => navigate(path)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#F9F7F7',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  transition: '0.5s',
                  '&:hover': {
                    color: '#4A4E69',
                    backgroundColor: '#F9F7F7',
                    transition: '0.3s',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#FF6F61',
                    transform: 'translateY(-100%)',
                    transition: 'transform 0.3s ease',
                    zIndex: -1,
                  },
                  '&:hover:before': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                {pageName}
              </Button>
            </motion.div>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
