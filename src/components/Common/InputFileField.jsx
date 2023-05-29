import { AddAPhoto } from '@mui/icons-material';
import { Fab, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { toast } from 'react-toastify';

const InputFileField = ({ name, control, label, disabled, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const [avatarPick, setAvatarPick] = useState();
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.type.slice(0, 5) != 'image') {
      toast.error('Vui lòng chọn định dạng file ảnh!');
    } else {
      onChange(file);
      console.log('file: ', file, 'value: ', value);
      // const newFile = {
      //   ...file,
      //   preview: URL.createObjectURL(file),
      // };
      // console.log(newFile);
      setAvatarPick(URL.createObjectURL(file));
      // }
    }
  };

  useEffect(() => {
    return () => {
      avatarPick && URL.revokeObjectURL(avatarPick);
    };
  }, [avatarPick]);
  return (
    <div style={inputFileField}>
      <div style={inputFileLeft}>
        <Typography>{label}</Typography>
        <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="upload-photo">
          <TextField
            sx={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            // value={value}
            accept="image/*"
            onChange={handlePreviewAvatar}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={{ ...inputProps, accept: 'image/*' }}
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
            src={avatarPick || value.url}
            alt="preview-avatar"
          />
        ) : (
          <span style={previewStyle}>Preview Image</span>
        )}
        <small style={{ color: '#d32f2f', fontSize: '12px' }}>{error?.message}</small>
      </div>
    </div>
  );
};

const inputFileField = {
  display: 'flex',
  gap: '20px',
  width: '100%',
  margin: '7px 0',
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

export default InputFileField;
