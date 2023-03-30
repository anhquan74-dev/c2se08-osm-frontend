import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useController } from 'react-hook-form';

const InputField = ({ name, control, label, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      margin="normal"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};

export default InputField;
