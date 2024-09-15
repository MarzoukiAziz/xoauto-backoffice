import React, { useState } from 'react';
import { Box, Button, MenuItem } from '@mui/material';
import ParentCard from 'src/components/shared/ParentCard';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { addNewArticle } from 'src/store/blog/BlogSlice';
import { dispatch } from 'src/store/Store';
import { useNavigate } from 'react-router';
import Notification from 'src/layouts/full/shared/notification/Notification';

//TODO change categories place
const categories = [
  "Essais",
  "Nouveautés",
  "Technologies",
  "Tendances",
  "AutoSport"
]

const ArticleForm = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ title: '', subtitle: '', severity: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('category', event.target.value);
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .min(10, 'Too Short!')
      .max(150, 'Too Long!')
      .required('Title is Required'),
    subtitle: yup
      .string()
      .min(10, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Subtitle is Required'),
    content: yup.string().required('Content is Required'),
    previewImg: yup.string().required('Preview Image is Required'),
    category: yup.string().required('Category is Required'),
    readTime: yup.string().required('Read Time is Required'),
    tags: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      content: '',
      previewImg: '',
      category: '',
      readTime: '',
      tags: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const articleData = {
        title: values.title,
        subtitle: values.subtitle,
        content: values.content,
        previewImg: values.previewImg,
        category: values.category,
        readTime: Number(values.readTime),
        tags: values.tags,
      };

      try {
        await dispatch(addNewArticle(articleData));
        setNotificationData({ title: 'Success', subtitle: 'Article added successfully!', severity: 'success' });
        setShowNotification(true);
        setTimeout(() => {
          navigate('/blog');
        }, 2000);
      } catch (error) {
        setNotificationData({ title: 'Error', subtitle: 'Failed to add the article.', severity: 'error' });
        setShowNotification(true);
      }
    },
  });

  return (
    <>
      <ParentCard title="New Article">
        <form onSubmit={formik.handleSubmit}>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="Title"
          >
            Title
          </CustomFormLabel>
          <CustomTextField
            id="title"
            variant="outlined"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <CustomFormLabel htmlFor="subtitle">SubTitle</CustomFormLabel>
          <CustomTextField
            id="subtitle"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={formik.values.subtitle}
            onChange={formik.handleChange}
            error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
            helperText={formik.touched.subtitle && formik.errors.subtitle}
          />
          <CustomFormLabel htmlFor="content">Content  &#40;html&#41;</CustomFormLabel>
          <CustomTextField
            id="content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <CustomFormLabel htmlFor="previewImg">Preview Image</CustomFormLabel>
          <CustomTextField id="previewImg" variant="outlined" fullWidth
            value={formik.values.previewImg}
            onChange={formik.handleChange}
            error={formik.touched.previewImg && Boolean(formik.errors.previewImg)}
            helperText={formik.touched.previewImg && formik.errors.previewImg}
          />
          <CustomFormLabel htmlFor="category">Category</CustomFormLabel>
          <CustomSelect
            fullWidth
            id="category"
            variant="outlined"
            value={formik.values.category}
            onChange={handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            sx={{
              mb: 2,
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomFormLabel htmlFor="readTime">Read Time &#40;min&#41;</CustomFormLabel>
          <CustomTextField id="readTime" type="number" variant="outlined" value={formik.values.readTime}
            onChange={formik.handleChange}
            error={formik.touched.readTime && Boolean(formik.errors.readTime)}
            helperText={formik.touched.readTime && formik.errors.readTime} fullWidth />
          <CustomFormLabel htmlFor="tags">Tags  &#40;Separated by ,&#41;</CustomFormLabel>
          <CustomTextField id="tags" variant="outlined" fullWidth
            value={formik.values.tags}
            onChange={formik.handleChange}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags}
          />

          <Box sx={{
            mt: 3, display: 'flex', justifyContent: 'flex-end'
          }}>
            <Button color="primary" variant="contained" type='submit'>
              Update
            </Button>
          </Box>
        </form>
      </ParentCard>
      {showNotification && (
        <Notification title={notificationData.title} subtitle={notificationData.subtitle} severity={notificationData.severity} />
      )}</>
  );
};

export default ArticleForm;
