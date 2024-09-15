import React, { useState } from 'react';
import { Box, Button, MenuItem } from '@mui/material';
import ParentCard from 'src/components/shared/ParentCard';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { updateArticleById } from 'src/store/blog/BlogSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Notification from 'src/layouts/full/shared/notification/Notification';
import { AppState, dispatch } from 'src/store/Store';
import { ArticleType } from 'src/types/blog';

// TODO: Change categories list if needed
const categories = [
    "Essais",
    "Nouveautés",
    "Technologies",
    "Tendances",
    "AutoSport"
];

const ArticleUpdateForm = () => {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({ title: '', subtitle: '', severity: '' });

    const selectedArticle: ArticleType | any = useSelector((state: AppState) => state.blogReducer.selectedArticle);
    const formik = useFormik({
        initialValues: selectedArticle,
        validationSchema: yup.object({
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
            tags: yup.string(),
        }),
        onSubmit: async (values) => {
            const articleData = {
                _id: selectedArticle._id,
                title: values.title,
                subtitle: values.subtitle,
                content: values.content,
                previewImg: values.previewImg,
                category: values.category,
                readTime: Number(values.readTime),
                tags: values.tags,
            };

            try {
                await dispatch(updateArticleById(articleData));
                setNotificationData({ title: 'Success', subtitle: 'Article Updated successfully!', severity: 'success' });
                setShowNotification(true);
                navigate(`/blog/article/${selectedArticle._id}`);
            } catch (error) {
                setNotificationData({ title: 'Error', subtitle: 'Failed to update the article.', severity: 'error' });
                setShowNotification(true);
            }
        },
    });

    if (!selectedArticle) {
        return <div>Loading article...</div>;
    }

    return (
        <>
            <ParentCard title="Edit Article">
                <form onSubmit={formik.handleSubmit}>
                    <CustomFormLabel htmlFor="title">Title</CustomFormLabel>
                    <CustomTextField
                        id="title"
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('title')}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helpertext={formik.touched.title && formik.errors.title}
                    />

                    <CustomFormLabel htmlFor="subtitle">Subtitle</CustomFormLabel>
                    <CustomTextField
                        id="subtitle"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('subtitle')}
                        error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
                        helpertext={formik.touched.subtitle && formik.errors.subtitle}
                    />

                    <CustomFormLabel htmlFor="content">Content &#40;html&#41;</CustomFormLabel>
                    <CustomTextField
                        id="content"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('content')}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helpertext={formik.touched.content && formik.errors.content}
                    />

                    <CustomFormLabel htmlFor="previewImg">Preview Image</CustomFormLabel>
                    <CustomTextField
                        id="previewImg"
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('previewImg')}
                        error={formik.touched.previewImg && Boolean(formik.errors.previewImg)}
                        helpertext={formik.touched.previewImg && formik.errors.previewImg}
                    />

                    <CustomFormLabel htmlFor="category">Category</CustomFormLabel>
                    <CustomSelect
                        fullWidth
                        id="category"
                        variant="outlined"
                        {...formik.getFieldProps('category')}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helpertext={formik.touched.category && formik.errors.category}
                        sx={{ mb: 2 }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </CustomSelect>

                    <CustomFormLabel htmlFor="readTime">Read Time &#40;min&#41;</CustomFormLabel>
                    <CustomTextField
                        id="readTime"
                        type="number"
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('readTime')}
                        error={formik.touched.readTime && Boolean(formik.errors.readTime)}
                        helpertext={formik.touched.readTime && formik.errors.readTime}
                    />

                    <CustomFormLabel htmlFor="tags">Tags &#40;Separated by ,&#41;</CustomFormLabel>
                    <CustomTextField
                        id="tags"
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('tags')}
                        error={formik.touched.tags && Boolean(formik.errors.tags)}
                        helpertext={formik.touched.tags && formik.errors.tags}
                    />

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" variant="contained" type="submit">
                            Update
                        </Button>
                    </Box>
                </form>
            </ParentCard>

            {showNotification && (
                <Notification
                    title={notificationData.title}
                    subtitle={notificationData.subtitle}
                    severity={notificationData.severity}
                />
            )}
        </>
    );
};

export default ArticleUpdateForm;
