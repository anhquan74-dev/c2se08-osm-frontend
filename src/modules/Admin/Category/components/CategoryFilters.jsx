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

const CategoryFilters = ({ conditions, onChange }) => {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (!onChange) return;

    // debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          name: value,
        },
        page: 1,
      };
      onChange(newConditions);
    }, 500);
  };

  const handleClearFilter = () => {
    const newConditions = {
      ...conditions,
      filter: {},
      sort: [],
      page: 1,
    };
    onChange(newConditions);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel htmlFor="searchByName">Tìm kiểm theo tên danh mục</InputLabel>
            <OutlinedInput
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Tìm kiểm theo tên danh mục"
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
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

export default CategoryFilters;
