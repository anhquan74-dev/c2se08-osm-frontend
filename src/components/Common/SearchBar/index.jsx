import React from 'react';
import './SearchBar.scss';
import { LocationOn, Search } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbe17',
    },
  },
});

const SearchBar = () => {
  const navigate = useNavigate();

  const handleOnClickMap = () => {
    navigate('/finding-provider?search=map');
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="search-bar">
        <span className="search-map-btn" onClick={handleOnClickMap}>
          <LocationOn fontSize="medium" /> Bản đồ
        </span>
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
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;
