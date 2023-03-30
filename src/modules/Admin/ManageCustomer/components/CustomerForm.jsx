import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField, RadioGroupField } from '../../../../components/Common';
import SelectField from '../../../../components/Common/SelectField';

const CustomerForm = ({ initialValues, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues) => {
    console.log('Submit: ', formValues);
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" control={control} label="Email" />
        <InputField name="full_name" control={control} label="Họ và tên" />
        <InputField name="birthday" control={control} label="Ngày sinh" />
        <InputField name="phone_number" control={control} label="Số điện thoại" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Giới tính"
          options={[
            { label: 'Nam', value: 'male' },
            { label: 'Nữ', value: 'female' },
          ]}
        />
        <SelectField
          name=""
          control={control}
          label="Thành phố"
          options={[
            { label: 'Đà Nẵng', value: 'dn' },
            { label: 'HCM', value: 'hcm' },
          ]}
        />

        <Box>
          <Button mt={3} type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
