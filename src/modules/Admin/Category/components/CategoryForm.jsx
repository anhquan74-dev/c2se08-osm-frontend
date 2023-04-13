import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CategoryForm.scss';

const CategoryForm = ({ initialValues, onSubmit }) => {
  const [category, setCategory] = useState(initialValues);
  const [image, setImage] = useState();

  const options = [
    { label: 'Cải tạo nhà cửa', value: 1 },
    { label: 'Sửa điện & nước', value: 2 },
  ];
  console.log(category);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleReactQuillChange = (value) => {
    console.log(value);
    setCategory({
      ...category,
      content: value,
    });
  };

  const handleFormSubmit = (formValues) => {
    console.log('Submit: ', formValues);
  };

  const handleChangeImage = (e) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container px={2} spacing={3}>
        <Grid item xs={7}>
          <TextField
            id="outlined-basic"
            label="Tiêu đề"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            name="title"
            value={category.title}
            onChange={handleInputChange}
          />

          <Box className="editor-container">
            <ReactQuill
              className="editor"
              theme="snow"
              value={category.content}
              onChange={handleReactQuillChange}
              height
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth size="small" margin="normal" variant="outlined">
            <InputLabel id="category_id_label">Danh mục</InputLabel>
            <Select
              labelId="category_id_label"
              label="Danh mục"
              name="category_id"
              value={category.category_id}
              onChange={handleInputChange}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box my={2}>
            <Box>
              <Typography>Tải ảnh lên</Typography>
              <TextField
                id="outlined-basic"
                type="file"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                name="title"
                value={image}
                onChange={handleChangeImage}
              />
            </Box>
            <Box></Box>
            <Box className="category-image-preview">
              <img
                src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg"
                alt="category-image"
              />
            </Box>
          </Box>
        </Grid>
        <Box m={3}>
          <Button mt={3} type="submit" variant="contained" color="primary">
            Đăng bài
          </Button>
        </Box>
      </Grid>
    </form>
  );
};

export default CategoryForm;
