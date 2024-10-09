import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import NewSettings from './NewSettings';

const NewSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'New',
    },
  ];

  return (
    <PageContainer title="New Settings" description="this is New Settings">
      <Breadcrumb title="New Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <NewSettings />
    </PageContainer>
  );
};

export default NewSettingsPage;
