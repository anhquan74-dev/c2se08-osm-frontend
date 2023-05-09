import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export default function CityRankingList({ providerList }) {
  return (
    <TableContainer>
      <Table sx={table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Thợ</TableCell>
            <TableCell align="right">Số sao trung bình</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {providerList.map((provider, idx) => (
            <TableRow key={provider.id}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">{provider.full_name}</TableCell>
              <TableCell align="right">{provider.avg_star}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const table = {};
