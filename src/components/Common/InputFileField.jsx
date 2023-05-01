import { AddAPhoto } from '@mui/icons-material';
import { Fab, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

const InputFileField = ({ name, control, label, disabled, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const [avatar, setAvatar] = useState();
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    console.log(file);
    onChange(file);
    setAvatar(file);
  };

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  return (
    <div style={inputFileField}>
      <div style={inputFileLeft}>
        <Typography>Ảnh đại diện</Typography>
        <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="upload-photo">
          <TextField
            sx={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            // value={value}
            onChange={handlePreviewAvatar}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
          />

          <Fab color="default" size="small" component="span" aria-label="add" variant="extended">
            <AddAPhoto /> Tải ảnh lên
          </Fab>
        </label>
      </div>
      <div style={inputFileRight}>
        {value ? (
          <img
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            src={value.preview || value}
            alt="preview-avatar"
          />
        ) : (
          <span style={previewStyle}>Preview Image</span>
        )}
      </div>
    </div>
  );
};

const inputFileField = {
  display: 'flex',
  gap: '20px',
  width: '100%',
};
const inputFileLeft = {};
const inputFileRight = {
  width: '40%',
  height: '140px',
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

export default InputFileField;
