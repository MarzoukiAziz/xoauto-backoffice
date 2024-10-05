import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import EquipmentSettings from './EquipmentSettings';

const EquipmentSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Equipments',
    },
  ];

  return (
    <PageContainer title="Equipments Settings" description="this is Equipments Settings">
      <Breadcrumb title="Equipments Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <EquipmentSettings />
    </PageContainer>
  );
};

export default EquipmentSettingsPage;
