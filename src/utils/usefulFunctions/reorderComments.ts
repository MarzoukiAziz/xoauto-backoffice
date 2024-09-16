import { CommentType } from "src/types/blog";

export const reorderComments = (comments: CommentType[]): CommentType[] => {
    const commentMap: { [key: string]: CommentType } = {};
    const topLevelComments: CommentType[] = [];
    comments.forEach((comment) => {
        commentMap[comment._id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
        if (comment.answerTo) {
            const parentComment = commentMap[comment.answerTo];
            if (parentComment) {
                parentComment.replies.push(commentMap[comment._id]); // Push the cloned comment
            }
        } else {
            topLevelComments.push(commentMap[comment._id]);
        }
    });

    return topLevelComments;
}