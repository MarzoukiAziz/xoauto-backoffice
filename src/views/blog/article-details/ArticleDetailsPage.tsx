/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    CardContent,
    Stack,
    Typography,
    CardMedia,
    Chip,
    Box,
    Divider,
    Skeleton,
    Button,
    Pagination
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { fetchArticle } from 'src/store/blog/BlogSlice';
import { ArticleType, CommentType } from 'src/types/blog';
import BlankCard from 'src/components/shared/BlankCard';
import PageContainer from 'src/components/container/PageContainer';
import ArticleComment from './ArticleComment';
import { reorderComments } from 'src/utils/usefulFunctions/reorderComments';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

const ArticleDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchArticle(id, true));
        }
    }, [dispatch, id]);

    const article: ArticleType | any = useSelector((state: AppState) => state.blogReducer.selectedArticle);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { to: '/blog', title: 'Blog' },
        { title: 'Article Details' },
    ];

    const [isLoading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 8;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const paginatedComments = article?.comments ? reorderComments(article?.comments).slice(startIndex, endIndex) : [];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    return (
        article && (
            <PageContainer title={article?.title} description="this is Article details page">
                <Box>
                    <Breadcrumb title={article?.title} items={BCrumb} />
                    <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            disableElevation
                            color="primary"
                            component={Link}
                            to="/blog/update"
                        >
                            Edit Article
                        </Button>
                    </Box>
                    <BlankCard>
                        <>
                            {isLoading ? (
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    width="100%"
                                    height={440}
                                    sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                                />
                            ) : (
                                <CardMedia component="img" height="440" image={article?.previewImg} alt="green iguana" />
                            )}
                            <CardContent>
                                <Stack direction="row" sx={{ marginTop: '-45px' }}>
                                    <Chip
                                        sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: 'white' }}
                                        label={article.readTime + ' min Read'}
                                        size="small"
                                    />
                                </Stack>
                                <br />
                                <br />
                                <Chip label={article?.category} size="small" sx={{ marginTop: 2 }} />
                                <br />
                                <br />
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    fontWeight={600}
                                    color="inherit"
                                    sx={{ textDecoration: 'none', color: 'grey', float: 'right' }}
                                >
                                    Created At: {article?.createdAt ? formattedDate(article.createdAt) : ' N/A'} <br />
                                    Updated At: {article?.updatedAt ? formattedDate(article.updatedAt) : ' N/A'}
                                </Typography>
                                <br />
                                <br />
                                <Box my={3}>
                                    <Typography
                                        gutterBottom
                                        variant="h1"
                                        fontWeight={600}
                                        color="inherit"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        {article?.title}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <Typography variant="h5">{article.subtitle}</Typography>
                                <br />
                                <hr />
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                <br />
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    fontWeight={600}
                                    color="inherit"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Tags: {article?.tags}
                                </Typography>
                            </CardContent>
                        </>
                    </BlankCard>
                    <BlankCard sx={{ mt: 3, p: 0 }}>
                        {article?.comments && (
                            <CardContent>
                                <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
                                    <Typography variant="h4" fontWeight={600}>
                                        Comments
                                    </Typography>
                                    <Box px={1.5} py={1} color="primary.main" bgcolor={'primary.light'}>
                                        <Typography variant="h6" fontWeight={600}>
                                            {article?.comments.length}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Box>
                                    {paginatedComments.map((comment: CommentType | any) => (
                                        <ArticleComment comment={comment} key={comment._id} />
                                    ))}
                                </Box>
                                <Stack alignItems="center" mt={3}>
                                    <Pagination
                                        count={Math.ceil(article?.comments.length / commentsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Stack>
                            </CardContent>
                        )}
                    </BlankCard>
                </Box>
            </PageContainer>
        )
    );
};

export default ArticleDetailsPage;
