import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SettingsBc from 'src/assets/images/breadcrumb/settingsBc.png';
import ColorSettings from './ColorSettings';

const ColorSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Settings',
    },
    {
      title: 'Colors',
    },
  ];

  return (
    <PageContainer title="Colors Settings" description="this is Colors Settings">
      <Breadcrumb title="Colors Settings" items={BCrumb} breadcrumbImg={SettingsBc} />
      <ColorSettings />
    </PageContainer>
  );
};

export default ColorSettingsPage;
