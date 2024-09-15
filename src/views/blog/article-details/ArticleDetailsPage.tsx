/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
    Button
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { fetchArticle } from 'src/store/blog/BlogSlice';
import { ArticleType } from 'src/types/blog';
import BlankCard from 'src/components/shared/BlankCard';
import PageContainer from 'src/components/container/PageContainer';

const ArticleDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            dispatch(fetchArticle(id));
        }
    }, [dispatch, id]);

    // Get post
    const article: ArticleType | any = useSelector((state: AppState) => state.blogReducer.selectedArticle);
    const BCrumb = [
        {
            to: '/',
            title: 'Home',
        },
        {
            to: '/blog',
            title: 'Blog',
        },
        {
            title: 'Article Details',
        },
    ];

    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    return (
        article && <PageContainer title={article?.title} description="this is Article details page">
            <Box>
                <Breadcrumb title={article?.title} items={BCrumb} />
                <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" disableElevation color="primary" component={Link}
                        to="/blog/update">
                        Edit Article
                    </Button>
                </Box>
                <BlankCard>
                    <>
                        {isLoading ? (
                            <>
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    width="100%"
                                    height={440}
                                    sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                                ></Skeleton>
                            </>
                        ) : (
                            <CardMedia component="img" height="440" image={article?.previewImg} alt="green iguana" />
                        )}
                        <CardContent>
                            <Stack direction="row" sx={{ marginTop: '-45px' }}>
                                <Chip
                                    sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: 'white' }}
                                    label={article.readTime + " min Read"}
                                    size="small"
                                ></Chip>
                            </Stack>
                            <br />
                            <br />
                            <Chip label={article?.category} size="small" sx={{ marginTop: 2 }}></Chip>
                            <br /><br />
                            <Typography
                                gutterBottom
                                variant="h6"
                                fontWeight={600}
                                color="inherit"
                                sx={{ textDecoration: 'none' }}
                            >
                                Tags: {article?.tags}
                            </Typography>
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
                            <Stack direction="row" gap={3} alignItems="center">

                            </Stack>
                        </CardContent>
                        <Divider />
                        <CardContent>
                            <Typography variant="h5">{article.subtitle}</Typography>
                            <br />
                            <hr />

                            <div dangerouslySetInnerHTML={{ __html: article.content }} />

                        </CardContent>
                    </>
                </BlankCard>
                <BlankCard sx={{ mt: 3, p: 0 }}>
                    <CardContent>

                        <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
                            <Typography variant="h4" fontWeight={600}>
                                Comments
                            </Typography>
                            {/* <Box px={1.5} py={1} color="primary.main" bgcolor={'primary.light'}>
                       <Typography variant="h6" fontWeight={600}>
                           {post?.comments.length}
                       </Typography>
                   </Box> */}
                        </Stack>

                    </CardContent>
                </BlankCard>
            </Box>
        </PageContainer>)
};

export default ArticleDetailsPage;
