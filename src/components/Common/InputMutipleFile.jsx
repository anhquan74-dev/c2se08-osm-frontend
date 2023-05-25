import { AddAPhoto } from '@mui/icons-material';
import { Fab, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { toast } from 'react-toastify';

const InputFileField = ({ name, control, label, disabled, avatar, handleSetAvatar, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const handlePickFiles = (e) => {
    const files = e.target.files;
    console.log(files);
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.slice(0, 5) != 'image') {
        toast.error('Vui lòng chọn định dạng file ảnh!');
        count++;
        break;
      }
    }
    if (count > 0) {
      onChange(files);
    }
    // if (files.type.slice(0, 5) != 'image') {
    //   toast.error('Vui lòng chọn định dạng file ảnh!');
    // }
  };
  return (
    <div>
      <Typography>{label}</Typography>
      <TextField
        id="upload-photo"
        name="upload-photo"
        type="file"
        inputProps={{ ...inputProps, multiple: true, accept: 'image/*' }}
        // value={value}
        onChange={handlePickFiles}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
      />
    </div>
  );
};

// const inputFileField = {
//   display: 'flex',
//   gap: '20px',
//   width: '100%',
// };
// const inputFileLeft = {};
// const inputFileRight = {
//   width: '160px',
//   height: '160px',
// };
// const previewStyle = {
//   height: '100%',
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   border: '1px dashed #ccc',
//   color: '#ccc',
// };

export default InputFileField;
