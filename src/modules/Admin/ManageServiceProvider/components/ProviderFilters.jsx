import { Search } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import locationApi from '../../../../api/locationApi';
import { convertProviderName } from '../../../../utils/common';

const ProviderFilters = ({ conditions, onChange }) => {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getPublicProvinces = async () => {
      const res = await locationApi.getPublicProvinces();
      setCities(res?.data?.results);
    };
    getPublicProvinces();
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
          full_name: value,
        },
        page: 1,
      };
      onChange(newConditions);
    }, 500);
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        province_name: value,
      },
      page: 1,
    };
    onChange(newConditions);
  };

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
        <Grid item xs={12} md={6} lg={5}>
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
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <select
              value={conditions?.filter?.province_name || ''}
              className="select-dashboard"
              id="filterByCity"
              onChange={handleCityChange}
            >
              <option value={''}>
                <em>Tất cả thành phố</em>
              </option>
              {cities.map((city) => {
                return (
                  <option key={city.province_id} value={convertProviderName(city.province_name)}>
                    <em>{city.province_name}</em>
                  </option>
                );
              })}
            </select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="sortBy">Sắp xếp</InputLabel>
            <Select
              value={`${conditions?.sort?.at(0)?.sort_by}.${conditions?.sort?.at(0)?.sort_dir}`}
              labelId="sortBy"
              id="sortBy"
              label="Sắp xếp"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>Không sắp xếp</em>
              </MenuItem>
              <MenuItem value="full_name.asc">Tên tăng dần</MenuItem>
              <MenuItem value="full_name.desc">Tên giảm dần</MenuItem>
              <MenuItem value="avg_star.asc">Số sao tăng dần</MenuItem>
              <MenuItem value="avg_star.desc">Số sao giảm dần</MenuItem>
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

const selectCss = {
  // top: '16px',
  // left: '899px',
};

export default ProviderFilters;
