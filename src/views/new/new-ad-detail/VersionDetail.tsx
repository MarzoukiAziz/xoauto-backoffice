import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button } from '@mui/material';
import { dispatch } from 'src/store/Store';
import { showNotification } from 'src/store/notification/NotificationSlice';
import { VersionType } from 'src/types/new';
import { deleteSelectedNewAd } from 'src/store/new/NewAdSlice';

type VersionDetailProps = {
  brand: string;
  model: string;
  version: VersionType;
  versionsLengh: number;
};

const VersionDetail = ({ model, brand, version, versionsLengh }: VersionDetailProps) => {
  const navigate = useNavigate();
  const currency = process.env.REACT_APP_CURRENCY;
  const handleDeleteAd = (id: string) => {
    if (window.confirm('Are you sure you want to delete this version?')) {
      try {
        dispatch(deleteSelectedNewAd(id));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Version Deleted successfully!',
            severity: 'success',
          }),
        );
        if (versionsLengh > 1) {
          window.location.reload();
        } else {
          navigate('/new/');
        }
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to delete the version.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center"></Box>
      <Typography fontWeight="600" variant="h4" mt={1}>
        {brand + ' ' + model + ' ' + version.version}
      </Typography>
      <Typography variant="subtitle2" mt={1}>
        energy: <strong>{version.fuel_type}</strong> <br />
        Category: <strong>{version.category}</strong> <br />
        Seats: <strong>{version.seats}</strong> <br />
        Horse Power: <strong>{version.horsepower} CH</strong> <br />
        Power Kw: <strong>{version.power_kw} KW</strong> <br />
        Autonomy wltp Km: <strong>{version.autonomy_wltp_km} KM</strong> <br />
      </Typography>
      <Typography mt={2} variant="h4" fontWeight={600}>
        {currency} {Intl.NumberFormat('en-US').format(version.price)}
      </Typography>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} lg={6} md={6}>
          <Button
            color="secondary"
            size="large"
            fullWidth
            variant="contained"
            component={Link}
            to={`/new/edit/${version._id}`}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <Button
            color="error"
            size="large"
            fullWidth
            variant="contained"
            onClick={() => handleDeleteAd(version._id!)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VersionDetail;
