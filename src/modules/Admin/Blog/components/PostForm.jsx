import { Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostForm.scss';
import categoryApi from '../../../../api/categoryApi';
import { AddAPhoto } from '@mui/icons-material';
import { toast } from 'react-toastify';

const PostForm = ({ initialValues, onSubmit, isEdit }) => {
  const [post, setPost] = useState(initialValues);
  const [image, setImage] = useState();
  const [avatarPick, setAvatarPick] = useState();

  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const res = await categoryApi.getAll();
      setCategories(res.data);
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleReactQuillChange = (value) => {
    console.log(value);
    setPost({
      ...post,
      content: value,
    });
  };
  console.log(post);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit?.(post);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangeImage = (e) => {
  //   console.log(e.target.files[0]);
  //   setPost({
  //     ...post,
  //     image: e.target.files[0],
  //   });
  // };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file.type.slice(0, 5) != 'image') {
      toast.error('Vui lòng chọn định dạng file ảnh!');
    } else {
      setPost({
        ...post,
        image: file,
      });
      console.log('file: ', file, 'value: ', avatarPick);
      setAvatarPick(URL.createObjectURL(file));
      // }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container px={2} spacing={3}>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Tiêu đề"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />

          <Box className="editor-container">
            <ReactQuill className="editor" theme="snow" value={post.content} onChange={handleReactQuillChange} height />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth size="small" margin="normal" variant="outlined">
            <InputLabel id="category_id_label">Danh mục</InputLabel>
            <Select
              labelId="category_id_label"
              label="Danh mục"
              name="category_id"
              value={post.category_id}
              onChange={handleInputChange}
            >
              {categories?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box my={2}>
            <div className="form-group">
              <div style={inputFileField}>
                <div style={inputFileLeft}>
                  <Typography>Hình ảnh</Typography>
                  <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="upload-photo">
                    <TextField
                      sx={{ display: 'none' }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                      onChange={handlePreviewAvatar}
                    />
                    <Fab color="default" size="small" component="span" aria-label="add" variant="extended">
                      <AddAPhoto /> Tải ảnh lên
                    </Fab>
                  </label>
                </div>
                <div style={inputFileRight}>
                  {post.image ? (
                    <img
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      src={avatarPick || post.image.url}
                      alt="preview-avatar"
                    />
                  ) : (
                    <span style={previewStyle}>Preview Image</span>
                  )}
                </div>
              </div>
            </div>
          </Box>
          <FormControl fullWidth size="small" margin="normal" variant="outlined">
            <InputLabel id="isValidLabel">Trạng thái</InputLabel>
            <Select
              labelId="isValidLabel"
              name="is_valid"
              label="Trạng thái"
              value={post.is_valid}
              onChange={handleInputChange}
            >
              <MenuItem key={1} value={1}>
                Đăng bài
              </MenuItem>
              <MenuItem key={2} value={2}>
                Khóa
              </MenuItem>
            </Select>
          </FormControl>
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

const inputFileField = {
  display: 'flex',
  gap: '20px',
  width: '100%',
};
const inputFileLeft = {};
const inputFileRight = {
  width: '160px',
  height: '160px',
};
const previewStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dashed #ccc',
  color: '#ccc',
};

export default PostForm;
