import { Stack, Box, Typography, Tooltip, Fab } from '@mui/material';
import { IconCircle, IconTrash } from '@tabler/icons';
import { CommentType } from 'src/types/blog';
import { dispatch } from 'src/store/Store';
import { deleteSelectedComment } from 'src/store/blog/BlogSlice';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

const ArticleCommentReply = ({ reply }: CommentType | any) => {
    const handleDeleteComment = (id: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            dispatch(deleteSelectedComment(id));
        }
    };

    return (
        <Box pl={4} key={reply._id}>
            <Box mt={2} p={3} sx={{ backgroundColor: 'grey.100' }}>
                <Stack direction={'row'} gap={2} justifyContent="space-between">
                    <Typography variant="h6">{reply.user?.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                        <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                        Created At: {reply?.createdAt ? formattedDate(reply.createdAt) : ' N/A'} ||
                        Updated At: {reply?.updatedAt ? formattedDate(reply.updatedAt) : ' N/A'}
                    </Typography>
                    <Tooltip title="delete" placement="top">
                        <Fab size="small" color="error" onClick={() => handleDeleteComment(reply._id)}>
                            <IconTrash size="16" />
                        </Fab>
                    </Tooltip>
                </Stack>
                <Box py={2}>
                    <Typography color="textSecondary">{reply.content}</Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default ArticleCommentReply;
