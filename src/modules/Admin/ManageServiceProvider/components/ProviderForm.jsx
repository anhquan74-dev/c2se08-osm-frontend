import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField, RadioGroupField } from '../../../../components/Common';
import DatePickerField from '../../../../components/Common/DatePickerField';
import InputFileField from '../../../../components/Common/InputFileField';
import LocationPickField from '../../../../components/Common/LocationPickField';
import SelectField from '../../../../components/Common/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import locationApi from '../../../../api/locationApi';

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

const ProviderForm = ({ initialValues, onSubmit, isEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { providerId } = useParams();
  const [location, setLocation] = useState();

  console.log(initialValues);

  const handleFormSubmit = async (formValues) => {
    console.log('Submit: ', formValues);

    try {
      await onSubmit?.(formValues, location);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };

  useEffect(() => {
    if (!providerId) return;
    (async () => {
      try {
        const res = await locationApi.getLocationByUserId(providerId);
        setLocation(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  return (
    <Box fullWidth margin="normal" variant="outlined">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={formFlex}>
          <div style={formLeft}>
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
            <InputField
              name="introduction"
              control={control}
              label="Giới thiệu"
              multiline
              rows={4}
              defaultValue="Default Value"
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
          </div>
          <div style={formRight}>
            <InputField name="is_favorite" control={control} disabled label="Là thợ được yêu thích" />
            <InputField name="is_working" control={control} disabled label="Trạng thái làm việc" />
            <InputField name="total_rate" control={control} disabled label="Tổng số lượt đánh giá" />
            <InputField name="total_star" control={control} disabled label="Tổng số sao  " />
            <InputField name="avg_star" control={control} disabled label="Số sao trung bình" />
            <InputField name="clicks" control={control} disabled label="Lượt clicks" />
            <InputField name="views" control={control} disabled label="Lượt views" />
          </div>
        </div>

        <Box>
          <Button
            sx={{ marginLeft: '20px' }}
            mt={3}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
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

const formFlex = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
};

const formLeft = {
  width: '58%',
};

const formRight = {
  width: '38%',
};

export default ProviderForm;
