import React from 'react';
import { Box, Grid } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import NewAdsTable from './NewAdsTable';
import { useSelector } from 'src/store/Store';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'New Cars',
  },
];

const NewAdsPage = () => {
  const newAdsCount: number = useSelector((state) => state.newAdReducer.count);

  return (
    <PageContainer title="New Cars List" description="this is New Cars page">
      <Breadcrumb title="New Cars" items={BCrumb} breadcrumbImg={AdsBcImg} />
      <ParentCard title={`Models (${newAdsCount})`}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ flex: '1 1 100%' }}>
              <NewAdsTable />
            </Box>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default NewAdsPage;
