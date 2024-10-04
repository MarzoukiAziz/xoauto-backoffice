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
import { addNewEnergy, deleteSelectedEnergy, fetchEnergies } from 'src/store/settings/EnergySlice';

const EnergySettings = () => {
  const energies = useSelector((state) => state.energySettingsReducer.energies);
  const [newEnergyName, setNewEnergyName] = useState('');

  useEffect(() => {
    dispatch(fetchEnergies());
  }, [dispatch]);

  const handleAddEnergy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newEnergyName.trim() && newEnergyName.trim()) {
      const newEnergy = {
        name_fr: newEnergyName,
      };
      dispatch(addNewEnergy(newEnergy));
      setNewEnergyName('');
    }
  };

  const handleDeleteEnergy = (id: string) => {
    if (confirm('Are you sure you want to delete this energy?')) {
      try {
        dispatch(deleteSelectedEnergy(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Energy Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this energy.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title={`Energies (${energies.length})`}>
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
                      {energies.map((energy) => (
                        <TableRow key={energy._id}>
                          <TableCell>{energy.name_fr}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteEnergy(energy._id ?? '')}
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
                <form onSubmit={handleAddEnergy}>
                  <TextField
                    label="New Energy Name"
                    variant="outlined"
                    fullWidth
                    value={newEnergyName}
                    onChange={(e) => setNewEnergyName(e.target.value)}
                  />

                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
                      Add Energy
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

export default EnergySettings;
