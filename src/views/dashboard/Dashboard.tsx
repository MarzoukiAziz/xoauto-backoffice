import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import TopCards from 'src/components/dashboards/TopCards';
import { useSelector } from 'react-redux';
import { AppState, dispatch } from 'src/store/Store';
import { fetchDashboardHighlights } from 'src/store/inshights/InshightsSlice';

const Dashboard = () => {
  const highlights = useSelector((state: AppState) => state.inshightsReducer.dashboardHighlights);

  useEffect(() => {
    dispatch(fetchDashboardHighlights());
  }, []);

  return (
    <PageContainer title="XoAuto Dashboard" description="this is XoAuto Dashboard page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <TopCards data={highlights} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
