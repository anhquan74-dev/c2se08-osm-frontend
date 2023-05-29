import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export default function StatisticItem({ icon, label, value }) {
  return (
    <Paper sx={root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
const root = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: `1px solid #1876d2`,
};
