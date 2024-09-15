import React, { } from 'react';
import ArticleForm from './ArticleForm';
import PageContainer from 'src/components/container/PageContainer';

const ArticleFormPage = () => {
    return (
        <PageContainer title="New Article" description="this is new Article form page">
            <ArticleForm />
        </PageContainer>
    )
};

export default ArticleFormPage;
