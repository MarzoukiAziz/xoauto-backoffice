import React from 'react';
import { Box, Grid } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Table2 from './UsersTable';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Users',
  },
];

const UsersPage = () => (
  <PageContainer title="Users List" description="this is Users page">
    {/* breadcrumb */}
    <Breadcrumb title="Users" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title="Users">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <Table2 />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
);

export default UsersPage;
