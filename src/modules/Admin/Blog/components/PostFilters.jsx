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
import { useEffect, useRef, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';

const ProviderFilters = ({ conditions, onChange }) => {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const res = await categoryApi.getAll();
      setCategories(res.data);
    })();
  }, []);

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
          title: value,
        },
        page: 1,
      };
      onChange(newConditions);
    }, 500);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        category_id: value,
      },
      page: 1,
    };
    onChange(newConditions);
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
            <InputLabel htmlFor="searchByName">Tìm kiểm theo tiêu đề</InputLabel>
            <OutlinedInput
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Search by name"
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="filterByCategory">Lọc theo danh mục</InputLabel>
            <Select
              labelId="filterByCategory"
              id="filterByCategory"
              label="Lọc theo thành phố"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {categories?.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    <em>{category.name}</em>
                  </MenuItem>
                );
              })}
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

export default ProviderFilters;
