import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { InputField } from '../../../../components/Common';
import InputFileField from '../../../../components/Common/InputFileField';
import SelectField from '../../../../components/Common/SelectField';
import './CategoryForm.scss';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên danh mục'),
    logo: yup.mixed().test('required', 'Vui lòng chọn ảnh', (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file) return true;
      return false;
    }),
    is_valid: yup.string().required('Vui lòng chọn trạng thái tài khoản'),
  })
  .required();

const CategoryForm = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { categoryId } = useParams();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
      console.log('initialValues: ', initialValues);

      setIsDirty(JSON.stringify(initialValues) !== JSON.stringify(data));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  const handleFormSubmit = async (formValues) => {
    console.log('Submit: ', formValues);

    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxWidth={800}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Tên danh mục" />
        <InputFileField name="logo" control={control} label="Logo" />
        <InputField name="view_priority" control={control} label="Ưu tiên hiển thị" />
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
          <Button mt={3} type="submit" variant="contained" color="primary" disabled={isSubmitting || !isDirty}>
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

export default CategoryForm;
