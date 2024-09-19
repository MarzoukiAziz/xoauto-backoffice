import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Pagination,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import { IconDotsVertical, IconEdit, IconSearch, IconTrash } from '@tabler/icons';
import { dispatch, useSelector } from 'src/store/Store';
import { deleteSelectedArticle, fetchArticle, fetchArticles } from 'src/store/blog/BlogSlice';
import { ArticleType } from 'src/types/blog';
import { Link, useNavigate } from 'react-router-dom';
import { showNotification } from 'src/store/notification/NotificationSlice';

const ArticlesTable = () => {
  //TODO change categories place
  const categories = [
    "Essais",
    "Nouveautés",
    "Technologies",
    "Tendances",
    "AutoSport"
  ]
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };

  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>, articleId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [articleId]: event.currentTarget }));
  };

  const handleClose = (articleId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [articleId]: null }));
  };

  useEffect(() => {
    dispatch(fetchArticles(search, selectedCategory, pageSize, currentPage, sortOrder));
  }, [currentPage, pageSize, search, selectedCategory, sortOrder]);

  const articles: ArticleType[] = useSelector((state) => state.blogReducer.articles);
  const articlesCount: number = useSelector((state) => state.blogReducer.count);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    const newSortOrder = event.target.value as 'asc' | 'desc';
    setSortOrder(newSortOrder);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
    setCurrentPage(1);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        dispatch(deleteSelectedArticle(id));
        dispatch(showNotification({
          title: 'Success',
          subtitle: 'Article Deleted successfully!',
          severity: 'success',
        }));
      } catch (error) {
        dispatch(showNotification({
          title: 'Error',
          subtitle: 'Failed to delete the article.',
          severity: 'error',
        }));
      }
    }
  };

  const handleEditArticle = (id: string) => {
    dispatch(fetchArticle(id)).then(() => {
      navigate('update');
    });
  };

  return (

    <>
      <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory || ''} onChange={handleCategoryChange}>
              <SelectMenuItem value="">All</SelectMenuItem>
              {categories.map(cat => <SelectMenuItem value={cat} key={cat}>{cat}</SelectMenuItem>)}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange}>
              <SelectMenuItem value="desc">Newest</SelectMenuItem>
              <SelectMenuItem value="asc">Oldest</SelectMenuItem>
            </Select>
          </FormControl>
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
          /></Box>
        <Button variant="contained" disableElevation color="primary" component={Link}
          to="new">
          New Article
        </Button>
      </Box>
      <BlankCard>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Title</Typography></TableCell>
                <TableCell><Typography variant="h6">Category</Typography></TableCell>
                <TableCell><Typography variant="h6">Views</Typography></TableCell>
                <TableCell><Typography variant="h6">Comments</Typography></TableCell>
                <TableCell><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                article._id && (
                  <TableRow key={article._id}>
                    <TableCell>
                      <Typography variant="subtitle1" color="textSecondary">
                        <Link to={`/blog/article/${article._id}`}>{article.title}</Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={article.category}
                        sx={{
                          backgroundColor: (theme) => theme.palette.secondary.light,
                          color: (theme) => theme.palette.secondary.main,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textSecondary">
                        {article.views}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textSecondary">
                        {article.commentCount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleClick(e, article._id ?? '')}
                        aria-controls={anchorEl[article._id] ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl[article._id] ? 'true' : undefined}
                      >
                        <IconDotsVertical width={18} />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[article._id]}
                        open={Boolean(anchorEl[article._id])}
                        onClose={() => handleClose(article._id ?? '')}
                      >
                        <MenuItem onClick={() => handleEditArticle(article._id ?? '')}>
                          <ListItemIcon>
                            <IconEdit width={18} />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteArticle(article._id ?? '')}>
                          <ListItemIcon>
                            <IconTrash width={18} />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={Math.ceil(articlesCount / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center' }}
          />
        </TableContainer>
      </BlankCard></>
  );
};

export default ArticlesTable;
