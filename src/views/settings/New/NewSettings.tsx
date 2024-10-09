import { FormEvent, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'src/store/Store';
import ParentCard from 'src/components/shared/ParentCard';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { Button, Stack, Chip } from '@mui/material';
import { NewSettingsType } from 'src/types/settings/new';
import { fetchBrands } from 'src/store/settings/BrandSlice';
import { fetchNewSettings, updateNewSettings } from 'src/store/settings/NewSlice';
import { showNotification } from 'src/store/notification/NotificationSlice';

const NewSettings = () => {
  const settings: NewSettingsType = useSelector((state) => state.newSettingsReducer.settings);
  const brands = useSelector((state) => state.brandSettingsReducer.brands);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchNewSettings());
  }, []);

  useEffect(() => {
    if (settings?.brands) {
      setSelectedBrands(settings.brands);
    }
  }, [settings?.brands]);

  const toggleBrandSelection = (brandId: string) => {
    setSelectedBrands(
      selectedBrands.includes(brandId)
        ? selectedBrands.filter((id) => id !== brandId)
        : [...selectedBrands, brandId],
    );
  };

  const handleUpdateSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirm('Are you sure you want to update new settings ?')) {
      try {
        dispatch(
          updateNewSettings({
            brands: selectedBrands,
          }),
        );
        dispatch(
          showNotification({
            title: 'Success',
            subtitle: 'Settings updated successfully!',
            severity: 'success',
          }),
        );
      } catch (error) {
        dispatch(
          showNotification({
            title: 'Error',
            subtitle: 'Failed to update settings.',
            severity: 'error',
          }),
        );
      }
    }
  };

  return (
    <ParentCard title="New Settings">
      <form onSubmit={handleUpdateSettings}>
        <CustomFormLabel htmlFor="outlined-multiline-static">Brands</CustomFormLabel>
        <Stack direction="row" sx={{ marginBottom: 2, flexWrap: 'wrap' }}>
          {brands.map((brand) => (
            <Chip
              sx={{ marginBottom: 2, marginX: 0.5 }}
              key={brand._id}
              label={brand.name}
              clickable
              color={selectedBrands.includes(brand._id!) ? 'primary' : 'default'}
              onClick={() => toggleBrandSelection(brand._id!)}
            />
          ))}
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="success" style={{ marginTop: '10px' }}>
            Update
          </Button>
        </Stack>
      </form>
    </ParentCard>
  );
};

export default NewSettings;
