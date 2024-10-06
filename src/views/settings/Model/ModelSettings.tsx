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
  FormControl,
  MenuItem as SelectMenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ParentCard from 'src/components/shared/ParentCard';
import { showNotification } from 'src/store/notification/NotificationSlice';
import { addNewModel, deleteSelectedModel, fetchModels } from 'src/store/settings/ModelSlice';
import { BrandType } from 'src/types/settings/brand';
import { fetchBrands } from 'src/store/settings/BrandSlice';

const ModelSettings = () => {
  const models = useSelector((state) => state.modelSettingsReducer.models);
  const brands = useSelector((state) => state.brandSettingsReducer.brands);
  const [newModelName, setNewModelName] = useState('');
  const [newModelBrand, setNewModelBrand] = useState<BrandType | undefined>(undefined);
  const [selectedBrand, setSelectedBrand] = useState<string>(''); // State for the selected brand filter

  useEffect(() => {
    dispatch(fetchModels());
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleAddModel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newModelName.trim() && newModelName.trim()) {
      const newModel = {
        name: newModelName,
        brandId: newModelBrand?._id,
      };
      dispatch(addNewModel(newModel));
      setNewModelName('');
      setNewModelBrand(undefined);
    }
  };

  const handleDeleteModel = (id: string) => {
    if (confirm('Are you sure you want to delete this model?')) {
      try {
        dispatch(deleteSelectedModel(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Model Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this model.',
            severity: 'error',
          }),
        );
      }
    }
  };

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    const newBrandId = event.target.value;
    const newBrand = brands.filter((brand) => brand._id == newBrandId);
    setNewModelBrand(newBrand[0]);
  };

  const handleFilterBrandChange = (event: SelectChangeEvent<string>) => {
    setSelectedBrand(event.target.value);
  };

  // Filter models by selected brand
  const filteredModels = selectedBrand
    ? models.filter((model) => model.brandId._id === selectedBrand)
    : models;

  return (
    <ParentCard title={`Models (${models.length})`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ flex: '1 1 100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {/* Add filter by brand */}
                <Stack spacing={2} direction={'row'} justifyContent="end">
                  <h4>Filter by Brand</h4>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select value={selectedBrand} onChange={handleFilterBrandChange}>
                      <SelectMenuItem value="">
                        <em>All Brands</em>
                      </SelectMenuItem>
                      {brands.map((brand: BrandType) => (
                        <SelectMenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                {/* Table for models */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Brand </TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredModels.map((model) => (
                        <TableRow key={model._id}>
                          <TableCell>{model.name}</TableCell>
                          <TableCell>{model.brandId.name}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteModel(model._id ?? '')}
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
                <form onSubmit={handleAddModel}>
                  <TextField
                    label="New Model Name"
                    variant="outlined"
                    fullWidth
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Brand</InputLabel>
                    <Select value={newModelBrand?._id} onChange={handleBrandChange}>
                      {brands.map((brand: BrandType) => (
                        <SelectMenuItem key={brand?._id} value={brand._id}>
                          {brand.name}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
                      Add Model
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

export default ModelSettings;
