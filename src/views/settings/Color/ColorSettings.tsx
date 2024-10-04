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
import { addNewColor, deleteSelectedColor, fetchColors } from 'src/store/settings/ColorSlice';

const ColorSettings = () => {
  const colors = useSelector((state) => state.colorSettingsReducer.colors);
  const [newColorName, setNewColorName] = useState('');

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const handleAddColor = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newColorName.trim() && newColorName.trim()) {
      const newColor = {
        name_fr: newColorName,
      };
      dispatch(addNewColor(newColor));
      setNewColorName('');
    }
  };

  const handleDeleteColor = (id: string) => {
    if (confirm('Are you sure you want to delete this color?')) {
      try {
        dispatch(deleteSelectedColor(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Color Deleted successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete this color.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title={`Colors (${colors.length})`}>
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
                      {colors.map((color) => (
                        <TableRow key={color._id}>
                          <TableCell>{color.name_fr}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteColor(color._id ?? '')}
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
                <form onSubmit={handleAddColor}>
                  <TextField
                    label="New Color Name"
                    variant="outlined"
                    fullWidth
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                  />

                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{ marginTop: '10px' }}
                    >
                      Add Color
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

export default ColorSettings;
