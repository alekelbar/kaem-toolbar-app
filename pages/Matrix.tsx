import React from 'react'
import { Layout } from '../src/components';
import { Typography } from '@mui/material';


const Matrix = () => {
  return (
    <Layout>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Roboto',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          textAlign: 'center'
        }}
      >
        Matrix incoming...
      </Typography>
    </Layout>
  )
}

export default Matrix;
