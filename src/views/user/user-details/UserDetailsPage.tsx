import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import ProfileBanner from './ProfileBanner';
import IntroCard from './IntroCard';
import { useParams } from 'react-router';
import { AppState, dispatch } from 'src/store/Store';
import { fetchUser } from 'src/store/user/UserSlice';
import { UserType } from 'src/types/user';
import { useSelector } from 'react-redux';

const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const user: UserType | any = useSelector((state: AppState) => state.userReducer.selectedUser);

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(id));
        }
    }, [id]);

    return (
        (user && <PageContainer title={user.name} description="this is User Profile page">
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ProfileBanner user={user} />
                </Grid>
                <Grid item sm={12} lg={4} xs={12}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <IntroCard user={user} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} lg={8} xs={12}>
                </Grid>
            </Grid>
        </PageContainer>)
    );
};

export default UserDetailsPage;
