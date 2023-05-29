import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { useController } from 'react-hook-form';

const RadioGroupField = ({ name, control, label, disabled, options, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl disabled={disabled} margin="normal" error={invalid} {...inputProps}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => {
          return <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />;
        })}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroupField;
