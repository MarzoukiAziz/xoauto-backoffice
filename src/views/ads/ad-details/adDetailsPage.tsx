import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import { fetchAdById } from 'src/store/ad/AdSlice';
import { AdType } from 'src/types/ad';
import ChildCard from 'src/components/shared/ChildCard';
import AdCarousel from './AdCarousel';
import AdDetail from './AdDetail';
import AdDescription from './AdDescription';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchAdById(id));
    }
  }, [id]);

  const ad: AdType | any = useSelector((state: AppState) => state.adReducer.selectedAd);
  const BCrumb = [{ to: '/', title: 'Home' }, { to: '/ad', title: 'Ads' }, { title: 'Ad Details' }];

  return (
    ad && (
      <PageContainer title={ad.title} description={ad.title}>
        <Breadcrumb title={ad.title} items={BCrumb} breadcrumbImg={AdsBcImg} />
        <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
          <Grid item xs={12} sm={12} lg={12}>
            <ChildCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={6}>
                  <AdCarousel ad={ad} />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <AdDetail ad={ad} username={ad.uid?.name} />
                </Grid>
              </Grid>
            </ChildCard>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <AdDescription ad={ad} user={ad.uid} />
          </Grid>
        </Grid>
      </PageContainer>
    )
  );
};

export default AdDetailsPage;
