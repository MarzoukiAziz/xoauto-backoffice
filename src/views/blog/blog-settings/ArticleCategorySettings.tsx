import { FormEvent, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'src/store/Store';
import { fetchCategories, addNewCategory, deleteSelectedCategory } from 'src/store/blog/ArticleCatgorySlice';
import { Box, Grid, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ParentCard from 'src/components/shared/ParentCard';
import { showNotification } from 'src/store/notification/NotificationSlice';

const ArticleCategorySettings = () => {
    const categories = useSelector((state) => state.articleCatgoryReducer.categories);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newCategory.trim()) {
            dispatch(addNewCategory({ name: newCategory }));
            setNewCategory('');
        }
    };

    const handleDeleteCategory = (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                dispatch(deleteSelectedCategory(id))
                dispatch(showNotification({
                    title: 'Success',
                    subtitle: 'Ad Deleted successfully!',
                    severity: 'success',
                }));

            } catch (error) {
                dispatch(showNotification({
                    title: 'Error',
                    subtitle: 'Failed to delete this category.',
                    severity: 'error',
                }));
            }
        }
    };

    return (
        <ParentCard title={`Article Categories (${categories.length})`}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ flex: '1 1 100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Category Name</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {categories.map((category) => (
                                                <TableRow key={category._id}>
                                                    <TableCell>
                                                        {category.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => handleDeleteCategory(category._id ?? '')} color="secondary">
                                                            <DeleteIcon color='error' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <form onSubmit={handleAddCategory}>
                                    <TextField
                                        label="New Category"
                                        variant="outlined"
                                        fullWidth
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <Stack direction="row" justifyContent="flex-end">
                                        <Button type="submit" variant="contained" color="success" style={{ marginTop: '10px' }}>
                                            Add Category
                                        </Button>
                                    </Stack>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ParentCard>
    );
};

export default ArticleCategorySettings;
