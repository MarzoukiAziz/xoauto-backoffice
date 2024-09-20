import React from 'react';
import { Box, Grid } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import AdsTable from './AdsTable';
import { useSelector } from 'src/store/Store';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Ads',
  },
];

const AdsPage = () => {
  const adsCount = useSelector((state) =>
    state.adReducer.count
  );

  return (<PageContainer title="Ads List" description="this is Ads page">
    <Breadcrumb title="Ads" items={BCrumb} breadcrumbImg={AdsBcImg} />
    <ParentCard title={`Ads (${adsCount})`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ flex: '1 1 100%' }}>
            <AdsTable />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
  );
}

export default AdsPage;
