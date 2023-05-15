import { Search } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useRef } from 'react';
import './ProviderSort.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbe17',
    },
  },
});

const ProviderSort = ({ onChange, conditions }) => {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);

  const handleSortChange = (e) => {
    const { value } = e.target;
    const sortFollow = value.split('.');
    let newConditions;
    if (sortFollow[0] === '') {
      newConditions = {
        ...conditions,
        sort: [],
        page: 1,
      };
    } else {
      newConditions = {
        ...conditions,
        sort: [
          {
            sort_by: sortFollow[0],
            sort_dir: sortFollow[1],
          },
        ],
        page: 1,
      };
    }
    onChange(newConditions);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (!onChange) return;
    console.log(value);
    // debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          full_name: value,
          name: value,
        },
        page: 1,
      };
      console.log(newConditions);
      onChange(newConditions);
    }, 500);
  };

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
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </div>
        <div>
          <h4>Xếp theo</h4>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel color="primary" id="sortBy">
              Sắp xếp
            </InputLabel>
            <Select
              value={`${conditions?.sort?.at(0)?.sort_by}.${conditions?.sort?.at(0)?.sort_dir}`}
              color="primary"
              labelId="sortBy"
              id="sortBy"
              label="Sắp xếp"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>Không sắp xếp</em>
              </MenuItem>
              <MenuItem value="avg_star.asc">Đánh giá tăng dần</MenuItem>
              <MenuItem value="avg_star.desc">Đánh giá giảm dần</MenuItem>
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
