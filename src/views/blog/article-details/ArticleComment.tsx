import React, { useEffect, useState } from 'react';
import { Stack, Box, Typography, Tooltip, Fab } from '@mui/material';
import { IconCircle, IconTrash } from '@tabler/icons';
import { CommentType } from 'src/types/blog';
import axios from 'src/utils/axios';
import { UserType } from 'src/types/user';
import ArticleCommentReply from './ArticleCommentReply';
import { dispatch } from 'src/store/Store';
import { deleteSelectedComment } from 'src/store/blog/BlogSlice';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

const ArticleComment = ({ comment }: CommentType | any) => {
    const [user, setUser] = useState<UserType>();

    // TODO: correct this later
    const API_URL = 'http://localhost:5000/api/v1';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${comment.uid}`);
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };

        if (comment.uid) {
            fetchUser();
        }
    }, [comment.uid]);

    const handleDeleteComment = (id: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            dispatch(deleteSelectedComment(id));
        }
    };

    return (
        <>
            <Box mt={2} p={3} sx={{ backgroundColor: 'grey.100' }}>
                <Stack direction={'row'} gap={2} justifyContent="space-between">
                    <Typography variant="h6">{user ? user?.name : 'User'}</Typography>
                    <Typography variant="caption" color="textSecondary">
                        <>
                            <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                            Created At: {comment?.createdAt ? formattedDate(comment.createdAt) : ' N/A'} ||
                            Updated At: {comment?.updatedAt ? formattedDate(comment.updatedAt) : ' N/A'}
                        </>
                    </Typography>
                    <Tooltip title="delete" placement="top">
                        <Fab size="small" color="error" onClick={() => handleDeleteComment(comment._id)}>
                            <IconTrash size="16" />
                        </Fab>
                    </Tooltip>
                </Stack>
                <Box py={2}>
                    <Typography color="textSecondary">{comment?.content}</Typography>
                </Box>
            </Box>
            {comment?.replies.map((reply: CommentType | any) => {
                return (
                    <ArticleCommentReply reply={reply} key={reply._id} />
                );
            })}
        </>
    );
};

export default ArticleComment;
