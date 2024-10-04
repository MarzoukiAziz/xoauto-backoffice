import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import EnergySettings from './EnergySettings';

const EnergySettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Energies',
    },
  ];

  return (
    <PageContainer title="Energies Settings" description="this is Energies Settings">
      <Breadcrumb title="Energies Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <EnergySettings />
    </PageContainer>
  );
};

export default EnergySettingsPage;
