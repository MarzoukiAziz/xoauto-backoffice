import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import BrandSettings from './BrandSettings';

const BrandSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Brands',
    },
  ];

  return (
    <PageContainer title="Brands Settings" description="this is Brands Settings">
      <Breadcrumb title="Brands Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <BrandSettings />
    </PageContainer>
  );
};

export default BrandSettingsPage;
