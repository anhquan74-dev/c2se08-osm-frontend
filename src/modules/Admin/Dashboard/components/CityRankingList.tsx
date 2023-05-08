import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export default function CityRankingList({ cityList }) {
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
          {cityList.map((city, idx) => (
            <TableRow key={city.id}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">{city.name}</TableCell>
              <TableCell align="right">{city.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const table = {};
