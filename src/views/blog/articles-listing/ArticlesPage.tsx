import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import ArticlesTable from './ArticlesTable';
import { Link } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import { dispatch, useSelector } from 'src/store/Store';
import { fetchArticles } from 'src/store/blog/BlogSlice';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Blog',
  },
];


const ArticlesPage = () => {
  const [search, setSearch] = useState('');
  const articlesCount = useSelector((state) =>
    state.blogReducer.count
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      dispatch(fetchArticles(search));
    } else {
      dispatch(fetchArticles());
    }
  }, [search, dispatch]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };


  return (<PageContainer title="Articles List" description="this is Articles page">
    {/* breadcrumb */}
    <Breadcrumb title="Articles" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title={`Articles (${articlesCount})`}>
      <Grid container spacing={3}>

        <Grid item xs={12}>

          <Box sx={{ flex: '1 1 100%' }}>

            <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Article"
                size="small"
                onChange={handleSearch}
                value={search}
              />
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
}

export default ArticlesPage;
