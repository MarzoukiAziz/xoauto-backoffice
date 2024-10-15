import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import AdsBcImg from 'src/assets/images/breadcrumb/AdsBc.png';
import { fetchNewAd } from 'src/store/new/NewAdSlice';
import { ModelType } from 'src/types/new';
import NewAdDescription from './VersionTechnicalSheet';

const NewAdDetailPage = () => {
  const { brand, model } = useParams<{ brand: string; model: string }>();

  useEffect(() => {
    if (brand && model) {
      dispatch(fetchNewAd(brand, model));
    }
  }, [brand, model]);

  const newAd: ModelType | any = useSelector((state: AppState) => state.newAdReducer.selectedNewAd);
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/new', title: 'New Cars' },
    { title: 'Ad Details' },
  ];

  return (
    newAd && (
      <PageContainer
        title={newAd.brand + ' ' + newAd.modele}
        description={newAd.brand + ' ' + newAd.modele}
      >
        <Breadcrumb
          title={newAd.brand + ' ' + newAd.modele}
          items={BCrumb}
          breadcrumbImg={AdsBcImg}
        />
        <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
          <Grid item xs={12} sm={12} lg={12}>
            <NewAdDescription model={newAd} />
          </Grid>
        </Grid>
      </PageContainer>
    )
  );
};

export default NewAdDetailPage;
