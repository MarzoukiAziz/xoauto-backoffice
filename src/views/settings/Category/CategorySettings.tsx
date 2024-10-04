import { FormEvent, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'src/store/Store';

import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ParentCard from 'src/components/shared/ParentCard';
import { showNotification } from 'src/store/notification/NotificationSlice';
import {
  addNewCategory,
  deleteSelectedCategory,
  fetchCategories,
} from 'src/store/settings/CategorySlice';

const CategorySettings = () => {
  const categories = useSelector((state) => state.categorySettingsReducer.categories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newCategoryName.trim() && newCategoryName.trim()) {
      const newCategory = {
        name_fr: newCategoryName,
        icon: newCategoryIcon,
      };
      dispatch(addNewCategory(newCategory));
      setNewCategoryName('');
      setNewCategoryIcon('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        dispatch(deleteSelectedCategory(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Category Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this category.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title={`Categories (${categories.length})`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ flex: '1 1 100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Icon</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category._id}>
                          <TableCell>{category.name_fr}</TableCell>
                          <TableCell>{category.icon}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteCategory(category._id ?? '')}
                              color="secondary"
                            >
                              <DeleteIcon color="error" />
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
                    label="New Category Name"
                    variant="outlined"
                    fullWidth
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Stack mt={3}>
                    <TextField
                      label="New Category Icon"
                      variant="outlined"
                      fullWidth
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
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

export default CategorySettings;
