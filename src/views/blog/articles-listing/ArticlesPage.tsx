import React from 'react';
import { Box, Button, Grid } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import ArticlesTable from './ArticlesTable';
import { Link } from 'react-router-dom';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Blog',
  },
];


const ArticlesPage = () => (
  <PageContainer title="Articles List" description="this is Articles page">
    {/* breadcrumb */}
    <Breadcrumb title="Articles" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title="Articles">
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Box>
            <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" disableElevation color="primary" component={Link}
                to="new">
                New Article
              </Button>
            </Box>
            <ArticlesTable />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
);

export default ArticlesPage;
