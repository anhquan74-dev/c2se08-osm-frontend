import React from 'react';
import { useController } from 'react-hook-form';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';

const DatePickerField = ({ name, control, label, disabled, ...inputProps }) => {
  let {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  value = dayjs(value || new Date());
  const handleChangeDate = (e) => {
    onChange(moment(e.$d).format('YYYY-MM-DD HH:mm:ss'));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Ngày sinh"
          value={value}
          onChange={handleChangeDate}
          // onBlur={onBlur}
          inputRef={ref}
          onError={(invalid) => {
            console.log();
          }}
          slotProps={{
            textField: {
              helperText: error?.message,
            },
          }}
        />
        {/* <DatePicker label="Controlled picker" value={value} onChange={(newValue) => setValue(newValue)} /> */}
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerField;
