import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({text,...extraProps}) {
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress color="secondary" sx={{margin:"auto"}}/>
    </Box>
  )
}
