import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import TopCards from 'src/components/dashboards/TopCards';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchDashboardHighlights } from 'src/store/insights/InsightsSlice';
import { fetchCategories } from 'src/store/blog/ArticleCatgorySlice';
import { useEffect } from 'react';

const Dashboard = () => {
  const highlights = useSelector((state: AppState) => state.insightsReducer.dashboardHighlights);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDashboardHighlights());
  }, [dispatch]);

  return (
    <PageContainer title="Dashboard" description="this is XoAuto Dashboard page">
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
