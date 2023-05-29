import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { useController } from 'react-hook-form';

const SelectField = ({ name, control, label, disabled, options }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl fullWidth size="small" margin="normal" variant="outlined" disabled={disabled} error={invalid}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select labelId={`${name}_label`} label={label} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
