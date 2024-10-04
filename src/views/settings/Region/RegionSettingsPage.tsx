import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import RegionSettings from './RegionSettings';

const RegionSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Regions',
    },
  ];

  return (
    <PageContainer title="Regions Settings" description="this is Regions Settings">
      <Breadcrumb title="Regions Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <RegionSettings />
    </PageContainer>
  );
};

export default RegionSettingsPage;
