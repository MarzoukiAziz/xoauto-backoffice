import React from 'react';
import { Box, Grid } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import ArticlesTable from './ArticlesTable';
import { useSelector } from 'src/store/Store';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Blog',
  },
];


const ArticlesPage = () => {
  const articlesCount = useSelector((state) =>
    state.blogReducer.count
  );

  return (<PageContainer title="Articles List" description="this is Articles page">
    {/* breadcrumb */}
    <Breadcrumb title="Articles" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title={`Articles (${articlesCount})`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ flex: '1 1 100%' }}>
            <ArticlesTable />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
  );
}

export default ArticlesPage;
