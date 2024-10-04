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
import { addNewRegion, deleteSelectedRegion, fetchRegions } from 'src/store/settings/RegionSlice';

const RegionSettings = () => {
  const regions = useSelector((state) => state.regionSettingsReducer.regions);
  const [newRegionName, setNewRegionName] = useState('');

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleAddRegion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newRegionName.trim() && newRegionName.trim()) {
      const newRegion = {
        name_fr: newRegionName,
      };
      dispatch(addNewRegion(newRegion));
      setNewRegionName('');
    }
  };

  const handleDeleteRegion = (id: string) => {
    if (confirm('Are you sure you want to delete this region?')) {
      try {
        dispatch(deleteSelectedRegion(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Region Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this region.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title={`Regions (${regions.length})`}>
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
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {regions.map((region) => (
                        <TableRow key={region._id}>
                          <TableCell>{region.name_fr}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteRegion(region._id ?? '')}
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
                <form onSubmit={handleAddRegion}>
                  <TextField
                    label="New Region Name"
                    variant="outlined"
                    fullWidth
                    value={newRegionName}
                    onChange={(e) => setNewRegionName(e.target.value)}
                  />

                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
                      Add Region
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

export default RegionSettings;
