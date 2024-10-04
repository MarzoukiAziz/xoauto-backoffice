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
import { addNewBrand, deleteSelectedBrand, fetchBrands } from 'src/store/settings/BrandSlice';

const BrandSettings = () => {
  const brands = useSelector((state) => state.brandSettingsReducer.brands);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandIcon, setNewBrandIcon] = useState('');

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleAddBrand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newBrandName.trim() && newBrandName.trim()) {
      const newBrand = {
        name: newBrandName,
        icon: newBrandIcon,
      };
      dispatch(addNewBrand(newBrand));
      setNewBrandName('');
      setNewBrandIcon('');
    }
  };

  const handleDeleteBrand = (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        dispatch(deleteSelectedBrand(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Brand Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this brand.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title={`Brands (${brands.length})`}>
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
                      {brands.map((brand) => (
                        <TableRow key={brand._id}>
                          <TableCell>{brand.name}</TableCell>
                          <TableCell>{brand.icon}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteBrand(brand._id ?? '')}
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
                <form onSubmit={handleAddBrand}>
                  <TextField
                    label="New Brand Name"
                    variant="outlined"
                    fullWidth
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                  />
                  <Stack mt={3}>
                    <TextField
                      label="New Brand Icon"
                      variant="outlined"
                      fullWidth
                      value={newBrandIcon}
                      onChange={(e) => setNewBrandIcon(e.target.value)}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
                      Add Brand
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

export default BrandSettings;
