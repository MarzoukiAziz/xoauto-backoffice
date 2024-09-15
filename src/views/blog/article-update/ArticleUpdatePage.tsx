import React, { } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ArticleUpdateForm from './ArticleUpdateForm';

const ArticleUpdatePage = () => {
    return (
        <PageContainer title="Edit Article" description="this is edit Article page">
            <ArticleUpdateForm />
        </PageContainer>
    )
};

export default ArticleUpdatePage;
