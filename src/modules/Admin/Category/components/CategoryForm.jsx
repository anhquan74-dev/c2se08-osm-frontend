import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './CategoryForm.scss';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';
import { InputField } from '../../../../components/Common';
import InputFileField from '../../../../components/Common/InputFileField';
import SelectField from '../../../../components/Common/SelectField';

const schema = yup.object({}).required();

const CategoryForm = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { categoryId } = useParams();

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

export default CategoryForm;
