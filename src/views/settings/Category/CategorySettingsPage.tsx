import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import CategorySettings from './CategorySettings';

const CategorySettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Categories',
    },
  ];

  return (
    <PageContainer title="Categories Settings" description="this is Categories Settings">
      <Breadcrumb title="Categories Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <CategorySettings />
    </PageContainer>
  );
};

export default CategorySettingsPage;
