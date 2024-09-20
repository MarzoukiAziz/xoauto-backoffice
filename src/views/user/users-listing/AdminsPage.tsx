import React from 'react';
import { Box, Grid } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import UsersTable from '../UsersTable';
import { useSelector } from 'src/store/Store';
import AdminsBcImg from 'src/assets/images/breadcrumb/AdminsBc.png';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Admins',
    },
];

const AdminsPage = () => {
    const adminsCount = useSelector((state) =>
        state.userReducer.count
    );

    return <PageContainer title="Admins List" description="this is Admins page">
        <Breadcrumb title="Admins" items={BCrumb} breadcrumbImg={AdminsBcImg} />
        <ParentCard title={`Admins (${adminsCount})`}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box>
                        <UsersTable role="ADMIN" />
                    </Box>
                </Grid>
            </Grid>
        </ParentCard>
    </PageContainer>
}

export default AdminsPage;