import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const InputField = ({ name, control, label, disabled, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <>
      {disabled ? (
        <TextField
          size="small"
          fullWidth
          label={label}
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          error={invalid}
          helperText={error?.message}
          {...inputProps}
        />
      ) : (
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
          {...inputProps}
        />
      )}
    </>
  );
};

export default InputField;
