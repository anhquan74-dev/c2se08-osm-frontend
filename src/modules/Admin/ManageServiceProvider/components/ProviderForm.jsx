import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField, InputMultipleFile, RadioGroupField } from '../../../../components/Common';
import DatePickerField from '../../../../components/Common/DatePickerField';
import InputFileField from '../../../../components/Common/InputFileField';
import LocationPickField from '../../../../components/Common/LocationPickField';
import SelectField from '../../../../components/Common/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import locationApi from '../../../../api/locationApi';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProviderForm = ({ initialValues, onSubmit, isEdit }) => {
  let objectValidation = {
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng!'),
    full_name: yup.string().required('Vui lòng nhập Họ và tên'),
    birthday: yup
      .date()
      .typeError('Vui lòng chọn đúng ngày sinh')
      // .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
      .max(new Date(Date.now() - 86400000), 'Ngày sinh không được chọn từ ngày hiện tại trở đi')
      .required('Vui lòng nhập ngày sinh'),
    gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
    phone_number: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Vui lòng nhập đúng định dạng số!')
      .max(11, 'Số điện thoại không vượt quá 11 số!'),
    is_valid: yup.string().required('Vui lòng chọn trạng thái tài khoản'),
  };
  if (!isEdit) {
    objectValidation = {
      ...objectValidation,
      password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
        .max(20, 'Mật khẩu không được vượt quá 20 kí tự')
        .required('Vui lòng nhập mật khẩu'),
    };
  }
  const schema = yup.object(objectValidation).required();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { providerId } = useParams();
  const [location, setLocation] = useState();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
      console.log('initialValues: ', initialValues);
      console.log(JSON.stringify(initialValues) !== JSON.stringify(data));
      setIsDirty(JSON.stringify(initialValues) !== JSON.stringify(data));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

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
    setLocation(initialValues?.location?.[0]);
    // if (!providerId) return;
    // (async () => {
    //   try {
    //     const res = await locationApi.getLocationByUserId(providerId);
    //     setLocation(res.data[0]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
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
              <InputFileField name="avatar" control={control} label="Ảnh đại diện" />
            </Box>
            <LocationPickField
              // name="location[0].address"
              name="location"
              control={control}
              handleSetLocation={handleSetLocation}
              location={location}
            />
            <InputMultipleFile name="banner" control={control} label="Ảnh bìa" />
            <InputField name="introduction" control={control} label="Giới thiệu" multiline rows={4} />
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
            disabled={isSubmitting || !isDirty}
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
