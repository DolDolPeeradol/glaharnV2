// src/components/Footer.js

import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '20px 0', textAlign: 'center' }}>
      <Container>
        <Typography variant="body2" color="gray">
        Author: Peeradol Thanyatheeraphong (Dollar), Computer Engineering student at KKU.
        </Typography>
        <Typography variant="body2" color="gray">
        Credit and special thanks to ChatGPT for providing nearly 100% assistance with code writing and sourcing information from various resources.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
