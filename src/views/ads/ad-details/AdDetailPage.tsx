import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import { fetchAdById } from 'src/store/ad/AdSlice';
import { AdType } from 'src/types/ad';
import ChildCard from 'src/components/shared/ChildCard';
import Carousel from '../../../components/carousel/Carousel';
import AdDetail from './AdDetail';
import AdDescription from './AdDescription';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';

const AdDetailPage = () => {
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
      <PageContainer
        title={ad.brand + ' ' + ad.car_model + ' ' + ad.version}
        description={ad.brand + ' ' + ad.car_model + ' ' + ad.version}
      >
        <Breadcrumb
          title={ad.brand + ' ' + ad.car_model + ' ' + ad.version}
          items={BCrumb}
          breadcrumbImg={AdsBcImg}
        />
        <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
          <Grid item xs={12} sm={12} lg={12}>
            <ChildCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={6}>
                  <Carousel photos={ad.photos} />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <AdDetail ad={ad} />
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

export default AdDetailPage;
