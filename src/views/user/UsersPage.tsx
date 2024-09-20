import React from 'react';
import { Box, Grid } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import UsersTable from './UsersTable';
import { useSelector } from 'src/store/Store';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Users',
  },
];

const UsersPage = () => {
  const usersCount = useSelector((state) =>
    state.userReducer.count
  )

  return <PageContainer title="Users List" description="this is Users page">
    <Breadcrumb title="Users" items={BCrumb} />
    <ParentCard title={`Users (${usersCount})`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <UsersTable role="USER" />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer >
}
export default UsersPage;
