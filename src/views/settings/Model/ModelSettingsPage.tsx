import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import ModelSettings from './ModelSettings';

const ModelSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Models',
    },
  ];

  return (
    <PageContainer title="Models Settings" description="this is Models Settings">
      <Breadcrumb title="Models Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <ModelSettings />
    </PageContainer>
  );
};

export default ModelSettingsPage;
