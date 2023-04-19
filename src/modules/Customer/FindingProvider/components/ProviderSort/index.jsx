import { Search } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import './ProviderSort.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbe17',
    },
  },
});

const ProviderSort = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="provider-sort-main">
        <div>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel color="primary" htmlFor="searchByName">
              Tìm kiếm theo tên
            </InputLabel>
            <OutlinedInput
              color="primary"
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Tìm kiểm theo tên"
            />
          </FormControl>
        </div>
        <div>
          <h4>Xếp theo</h4>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel color="primary" id="sortBy">
              Sắp xếp
            </InputLabel>
            <Select color="primary" labelId="sortBy" id="sortBy" label="Sắp xếp">
              <MenuItem value="">
                <em>Không sắp xếp</em>
              </MenuItem>
              <MenuItem value="rate.asc">Đánh giá tăng dần</MenuItem>
              <MenuItem value="rate.desc">Đánh giá giảm dần</MenuItem>
              <MenuItem value="price.asc">Giá tăng dần</MenuItem>
              <MenuItem value="price.desc">Giá giảm dần</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProviderSort;
