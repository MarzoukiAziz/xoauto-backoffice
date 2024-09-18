import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  useTheme
} from '@mui/material';
import { AdType } from 'src/types/ad';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

type AdDetailProps = {
  ad: AdType;
  username: string
};

const AdDetail = ({ ad, username }: AdDetailProps) => {
  const theme = useTheme();

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center">
        <Chip label={ad.type} color="success" size="small" />
        <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
          {ad.category}
        </Typography>
      </Box>
      <Typography fontWeight="600" variant="h4" mt={1}>
        {ad.title}
      </Typography>
      <Typography variant="subtitle2" mt={1} color={theme.palette.text.secondary}>
        Brand: <strong>{ad.brand}</strong> <br />
        Model: <strong>{ad.model}</strong> <br />
        Version: <strong>{ad.version}</strong> <br />
        Mileage: <strong>{Intl.NumberFormat('en-US').format(ad.mileage)} KM</strong><br />
        FirstRegistration:<strong>{ad.first_registration.month ?? ''} {ad.first_registration.month ? " / " : ""}{ad.first_registration.year}</strong>  <br />
      </Typography>
      <Typography mt={2} variant="h4" fontWeight={600}>
        €{Intl.NumberFormat('en-US').format(ad.price)}
      </Typography>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} lg={4} md={6}>
          <Button
            color="primary"
            size="large"
            fullWidth
            component={Link}
            variant="contained"
            to="/apps/eco-checkout"

          // onClick={() => dispatch(addToCart(ad))}
          >
            {ad.active ? "Deactivate" : "Activate"}
          </Button>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <Button
            color="error"
            size="large"
            fullWidth
            variant="contained"

          // onClick={() => dispatch(addToCart(ad)) && handleClick()}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Typography color="textSecondary" variant="body1" mt={4}>
        By : <strong>{username}</strong> <br />
        Created At : {ad.createdAt ? formattedDate(ad.createdAt) : "N/A"} <br />
        Updated At : {ad.updatedAt ? formattedDate(ad.updatedAt) : "N/A"}
      </Typography>
      <Typography color="textSecondary" variant="body1" mt={4}>
      </Typography>
    </Box>
  );
};

export default AdDetail;
