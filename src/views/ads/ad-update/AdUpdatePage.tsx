import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Grid,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from '@mui/material';
import { dispatch, useSelector } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import { AdType } from 'src/types/ad';
import { fetchAdById, updateAdById } from 'src/store/ad/AdSlice';
import { showNotification } from 'src/store/notification/NotificationSlice';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';

const AdUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [adData, setAdData] = useState<AdType | null>(null);
  const ad: AdType = useSelector((state: any) => state.adReducer.selectedAd);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdById(id));
    }
  }, [id]);

  useEffect(() => {
    if (ad) {
      setAdData(ad);
    }
  }, [ad]);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/ad', title: 'Ads' },
    { to: `/ad/${ad?._id}`, title: ad?.title },
    { title: 'Edit Ad' },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdData((prevState) => (prevState ? { ...prevState, [name]: value } : prevState));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAdData((prevState) =>
      prevState
        ? {
            ...prevState,

            options_vehicule: {
              ...adData?.options_vehicule,
              [name]: checked,
            },
          }
        : prevState,
    );
  };

  const handleMaskPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAdData((prevState) =>
      prevState
        ? {
            ...prevState,
            mask_phone: checked,
          }
        : prevState,
    );
  };

  const handleProChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAdData((prevState) =>
      prevState
        ? {
            ...prevState,
            pro: checked,
          }
        : prevState,
    );
  };

  const handleSoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAdData((prevState) =>
      prevState
        ? {
            ...prevState,
            sold: checked,
          }
        : prevState,
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (adData) {
      try {
        dispatch(updateAdById(adData));
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Ad updated successfully!',
            severity: 'success',
          }),
        );
        navigate(`/ad/${adData._id}`);
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to update ad.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    adData && (
      <PageContainer title="Edit Ad" description="This is the edit Ad page">
        <Breadcrumb title="Edit Ad" items={BCrumb} breadcrumbImg={AdsBcImg} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={adData.title}
                onChange={handleInputChange}
              />
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={adData.sold} onChange={handleSoldChange} name="sold" />
                  }
                  label="Sold"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Checkbox checked={adData.pro} onChange={handleProChange} name="pro" />}
                  label="Pro"
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={adData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Box my={3} bgcolor="primary.light" py={1} pl={3}>
            <Typography variant="h6">Description</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={adData.price}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                select
                fullWidth
                value={adData.type}
                onChange={handleInputChange}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                name="brand"
                fullWidth
                value={adData.brand}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Model"
                name="model"
                fullWidth
                value={adData.model}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Version"
                name="version"
                fullWidth
                value={adData.version}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                value={adData.category}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Mileage"
                name="mileage"
                type="number"
                fullWidth
                value={adData.mileage}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="First Registration (Month)"
                name="first_registration_month"
                type="number"
                fullWidth
                value={adData.first_registration.month}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    first_registration: {
                      ...adData.first_registration,
                      month: Number(e.target.value),
                    },
                  })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="First Registration (Year)"
                name="first_registration_year"
                type="number"
                fullWidth
                value={adData.first_registration.year}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    first_registration: {
                      ...adData.first_registration,
                      year: Number(e.target.value),
                    },
                  })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Type"
                name="fuel_type"
                fullWidth
                value={adData.fuel_type}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Seats"
                name="seats"
                type="number"
                fullWidth
                value={adData.seats}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                name="color"
                fullWidth
                value={adData.color}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Crit'Air"
                name="crit_air"
                fullWidth
                value={adData.crit_air}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Horsepower"
                name="horsepower"
                type="number"
                fullWidth
                value={adData.horsepower}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Power (kW)"
                name="power_kw"
                type="number"
                fullWidth
                value={adData.power_kw}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Autonomy (WLTP km)"
                name="autonomy_wltp_km"
                type="number"
                fullWidth
                value={adData.autonomy_wltp_km}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="AC Charging"
                name="AC"
                fullWidth
                value={adData?.courant?.AC}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="DC Charging"
                name="DC"
                fullWidth
                value={adData?.courant?.DC}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Box my={3} bgcolor="primary.light" py={1} pl={3}>
            <Typography variant="h6">Equipements</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="InDoor Equipements"
                name="indoor"
                value={adData.equipments?.indoor.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    equipments: {
                      ...adData.equipments,
                      indoor:
                        e.target.value.length > 0
                          ? e.target.value.split(',').map((opt) => opt.trim())
                          : [],
                    },
                  })
                }
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="OutDoor Equipements"
                name="outdoor"
                value={adData.equipments?.outdoor.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    equipments: {
                      ...adData.equipments,
                      outdoor:
                        e.target.value.length > 0
                          ? e.target.value.split(',').map((opt) => opt.trim())
                          : [],
                    },
                  })
                }
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Safety Equipements"
                name="safety"
                value={adData.equipments?.safety.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    equipments: {
                      ...adData.equipments,
                      safety:
                        e.target.value.length > 0
                          ? e.target.value.split(',').map((opt) => opt.trim())
                          : [],
                    },
                  })
                }
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Functional Equipements"
                name="functional"
                value={adData.equipments?.functional.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    equipments: {
                      ...adData.equipments,
                      functional:
                        e.target.value.length > 0
                          ? e.target.value.split(',').map((opt) => opt.trim())
                          : [],
                    },
                  })
                }
                fullWidth
                multiline
              />
            </Grid>
          </Grid>

          <Box my={3} bgcolor="primary.light" py={1} pl={3}>
            <Typography variant="h6">Options</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.options_vehicule.non_smoker}
                    onChange={handleOptionChange}
                    name="non_smoker"
                  />
                }
                label="Non-Smoker"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.options_vehicule.first_hand}
                    onChange={handleOptionChange}
                    name="first_hand"
                  />
                }
                label="First Hand"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.options_vehicule.manufacturer_warranty}
                    onChange={handleOptionChange}
                    name="manufacturer_warranty"
                  />
                }
                label="Manufacturer Warranty"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Other Options"
                name="others"
                fullWidth
                value={adData.options_vehicule?.others?.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    options_vehicule: {
                      ...adData.options_vehicule,
                      others:
                        e.target.value.length > 0
                          ? e.target.value.split(',').map((opt) => opt.trim())
                          : [],
                    },
                  })
                }
              />
            </Grid>
          </Grid>
          <Box my={3} bgcolor="primary.light" py={1} pl={3}>
            <Typography variant="h6">Media</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Photos"
                name="photos"
                value={adData.photos?.join(', ')}
                onChange={(e) =>
                  setAdData({
                    ...adData,
                    photos:
                      e.target.value.length > 0
                        ? e.target.value.split(',').map((opt) => opt.trim())
                        : [],
                  })
                }
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Interior Video URL"
                name="interior_video"
                value={adData.interior_video || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Exterior Video URL"
                name="exterior_video"
                value={adData.exterior_video || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box my={3} bgcolor="primary.light" py={1} pl={3}>
            <Typography variant="h6">Contact</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={adData.address || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Region"
                name="region"
                value={adData.region || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                value={adData.phone_number || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.mask_phone}
                    onChange={handleMaskPhoneChange}
                    name="mask_phone"
                  />
                }
                label="Mask Phone"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Button type="submit" fullWidth size="large" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </form>
      </PageContainer>
    )
  );
};

export default AdUpdatePage;
