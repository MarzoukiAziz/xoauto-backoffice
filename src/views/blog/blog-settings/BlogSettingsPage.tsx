import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlogBcImg from 'src/assets/images/breadcrumb/BlogBc.png';
import ArticleCategorySettings from './ArticleCategorySettings';

const BlogSettingsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Blog Settings',
    },
  ];

  return (
    <PageContainer title="Blog Settings" description="this is Blog Settings">
      <Breadcrumb title="Blog Settings" items={BCrumb} breadcrumbImg={BlogBcImg} />
      <ArticleCategorySettings />
    </PageContainer>
  );
};

export default BlogSettingsPage;
