import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import locationApi from '../../../../api/locationApi';
import { InputField, RadioGroupField } from '../../../../components/Common';
import DatePickerField from '../../../../components/Common/DatePickerField';
import InputFileField from '../../../../components/Common/InputFileField';
import LocationPickField from '../../../../components/Common/LocationPickField';
import SelectField from '../../../../components/Common/SelectField';
import { useParams } from 'react-router-dom';

const schema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email'),
    full_name: yup.string().required('Vui lòng nhập Họ và tên'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh'),
    gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
    phone_number: yup.number().positive().integer().required('Vui lòng nhập số điện thoại'),
    // avatar: yup.string().required(),
    // is_valid: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn trạng thái tài khoản').required(),
    // introduction: yup.string().required(),
  })
  .required();

const CustomerForm = ({ initialValues, onSubmit, isEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { customerId } = useParams();
  const [location, setLocation] = useState();

  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };

  useEffect(() => {
    if (!customerId) return;
    (async () => {
      try {
        const res = await locationApi.getLocationByUserId(customerId);
        setLocation(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleFormSubmit = async (formValues) => {
    console.log('Submit: ', formValues);

    try {
      await onSubmit?.(formValues, location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxWidth={800}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" control={control} label="Email" />
        <InputField name="password" control={control} label="Mật khẩu" disabled={isEdit} type="password" />
        <InputField name="full_name" control={control} label="Họ và tên" />
        <DatePickerField name="birthday" control={control} label="Ngày sinh" />
        <InputField name="phone_number" control={control} label="Số điện thoại" />
        <Box sx={{ display: 'flex', gap: '120px', width: '100%' }}>
          <RadioGroupField
            sx={{ width: '30%' }}
            name="gender"
            control={control}
            label="Giới tính"
            options={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
            ]}
          />
          <InputFileField name="avatar" control={control} />
        </Box>
        <LocationPickField
          name="location[0].address"
          control={control}
          handleSetLocation={handleSetLocation}
          location={location}
        />
        <SelectField
          name="is_valid"
          control={control}
          label="Trạng thái tài khoản"
          options={[
            { label: 'Hoạt động', value: 1 },
            { label: 'Khóa', value: 0 },
          ]}
        />

        <Box>
          <Button mt={3} type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && (
              <>
                <CircularProgress size={16} color="primary" />
                &nbsp;
              </>
            )}
            Lưu
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
