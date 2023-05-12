import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import LocationPickDialog from './LocationPickDialog';

const LocationPickField = ({ name, control, location, handleSetLocation, ...inputProps }) => {
  const [open, setOpen] = useState(false);
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  useEffect(() => {
    onChange([{ ...location }]);
  }, [location]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TextField
        size="small"
        fullWidth
        label="Địa chỉ"
        margin="normal"
        variant="outlined"
        value={location?.address || ''}
        // onChange={onChange}
        // disabled
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        {...inputProps}
        // InputProps={{
        //   readOnly: true,
        // }}
        onClick={() => setOpen(true)}
      />
      <LocationPickDialog onClose={handleClose} open={open} handleSetLocation={handleSetLocation} />
    </>
  );
};

export default LocationPickField;
