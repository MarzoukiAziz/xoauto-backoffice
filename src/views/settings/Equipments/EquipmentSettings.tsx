import { FormEvent, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'src/store/Store';
import ParentCard from 'src/components/shared/ParentCard';
import { fetchEquipments, updateEquipment } from 'src/store/settings/EquipmentSlice';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { Button, Stack } from '@mui/material';
import { EquipmentType } from 'src/types/settings/equipment';
import { showNotification } from 'src/store/notification/NotificationSlice';

const EquipmentSettings = () => {
  const equipments: EquipmentType = useSelector((state) => state.equipmentsReducer.equipments);
  const [safety, setSafety] = useState<string[]>(equipments.safety);
  const [outdoor, setOutdoor] = useState<string[]>(equipments.outdoor);
  const [indoor, setIndoor] = useState<string[]>(equipments.indoor);
  const [functional, setFunctional] = useState<string[]>(equipments.functional);

  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

  useEffect(() => {
    if (equipments) {
      setSafety(equipments.safety || []);
      setOutdoor(equipments.outdoor || []);
      setIndoor(equipments.indoor || []);
      setFunctional(equipments.functional || []);
    }
  }, [equipments]);

  const handleUpdateEquipments = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateEquipment({
        indoor,
        outdoor,
        safety,
        functional,
      }),
    );
    dispatch(
      showNotification({
        title: 'Success',
        subtitle: 'Equipments updated successfully!',
        severity: 'success',
      }),
    );
  };

  return (
    <ParentCard title="Equipments">
      <form onSubmit={handleUpdateEquipments}>
        <CustomFormLabel htmlFor="outlined-multiline-static">Indoor Equipmenets</CustomFormLabel>
        <CustomTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={indoor.join(';')}
          onChange={(e: any) => setIndoor(e.target.value.split(';'))}
        />
        <CustomFormLabel htmlFor="outlined-multiline-static">Outdoor Equipmenets</CustomFormLabel>
        <CustomTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          onChange={(e: any) => setOutdoor(e.target.value.split(';'))}
          value={outdoor.join(';')}
        />
        <CustomFormLabel htmlFor="outlined-multiline-static">Safety Equipmenets</CustomFormLabel>
        <CustomTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          onChange={(e: any) => setSafety(e.target.value.split(';'))}
          value={safety.join(';')}
        />
        <CustomFormLabel htmlFor="outlined-multiline-static">
          Functional Equipmenets
        </CustomFormLabel>
        <CustomTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          onChange={(e: any) => setFunctional(e.target.value.split(';'))}
          value={functional.join(';')}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="success" style={{ marginTop: '10px' }}>
            Update
          </Button>
        </Stack>
      </form>
    </ParentCard>
  );
};

export default EquipmentSettings;
