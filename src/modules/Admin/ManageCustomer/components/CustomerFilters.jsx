import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useRef } from 'react';

const CustomerFilters = ({ filter, onChange, onSearchChange }) => {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (!onSearchChange) return;

    // debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      // const newFilter = {
      //   ...filter,
      //   name: e.target.value,
      // };
      onSearchChange(value);
    }, 500);
  };

  const handleSortChange = () => {};

  const handleClearFilter = () => {};

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel htmlFor="searchByName">Tìm kiểm theo tên</InputLabel>
            <OutlinedInput
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Search by name"
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="filterByCity">Lọc theo thành phố</InputLabel>
            <Select labelId="filterByCity" id="filterByCity" label="Lọc theo thành phố" onChange={handleSortChange}>
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="sortBy">Sắp xếp</InputLabel>
            <Select labelId="sortBy" id="sortBy" label="Sắp xếp" onChange={handleSortChange}>
              <MenuItem value="">
                <em>Không sắp xếp</em>
              </MenuItem>
              <MenuItem value="full_name.asc">Tên tăng dần</MenuItem>
              <MenuItem value="full_name.desc">Tên giảm dần</MenuItem>
              <MenuItem value="city.asc">Thành phố giảm dần</MenuItem>
              <MenuItem value="city.desc">Thành phố tăng dần</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth sx={{ m: 1 }} onClick={handleClearFilter}>
            Xoá
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerFilters;
