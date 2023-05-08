import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export default function Widget({ title, children }) {
  return (
    <Paper sx={root}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}

const root = {
  padding: '16px',
  border: `1px solid #1876d2`,
};
