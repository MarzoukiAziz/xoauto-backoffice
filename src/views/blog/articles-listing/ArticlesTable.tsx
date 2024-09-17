import React, { useEffect } from 'react';
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
} from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons';
import { useDispatch, useSelector } from 'src/store/Store';
import { orderBy } from 'lodash';
import { deleteSelectedArticle, fetchArticle, fetchArticles } from 'src/store/blog/BlogSlice';
import { ArticleType } from 'src/types/blog';
import { Link, useNavigate } from 'react-router-dom';
import { showNotification } from 'src/store/notification/NotificationSlice';

const ArticlesTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, articleId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [articleId]: event.currentTarget }));
  };

  const handleClose = (userId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [userId]: null }));
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
  const navigate = useNavigate();

  const handleEditArticle = (id: string) => {
    // Fetch the article details and then navigate to the edit page
    dispatch(fetchArticle(id)).then(() => {
      navigate(`update`); // Redirect to the edit page
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterArticles = (articles: ArticleType[], sortBy: string, _cSearch: string) => {
    // SORT BY

    if (sortBy === 'newest') {
      articles = orderBy(articles, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      articles = orderBy(articles, ['createdAt'], ['asc']);
    }

    return articles;
  };

  const articles = useSelector((state) =>
    filterArticles(
      state.blogReducer.articles,
      state.blogReducer.sortBy,
      state.blogReducer.articleSearch,
    ),
  );

  return (
    <BlankCard>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Title </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">ReadTime</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              article._id && <TableRow
                key={article._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Link to={"/blog/article/" + article._id}>{article.title}</Link>
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={article.category}
                    sx={{
                      backgroundColor: (theme) => theme.palette.warning.light,
                      color: (theme) => theme.palette.warning.main,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary">
                    {article.readTime}
                  </Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    id="basic-button"
                    aria-controls={anchorEl[article._id] ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl[article._id] ? 'true' : undefined}
                    onClick={(e) => handleClick(e, article._id ?? '')}
                  >
                    <IconDotsVertical width={18} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl[article._id]}
                    open={Boolean(anchorEl[article._id])}
                    onClose={() => handleClose(article._id ?? '')}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </BlankCard >
  );
};

export default ArticlesTable;
