/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import { fetchAdById } from 'src/store/ad/AdSlice';
import { AdType } from 'src/types/ad';

const AdDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchAdById(id));
        }
    }, [dispatch, id]);

    const ad: AdType | any = useSelector((state: AppState) => state.adReducer.selectedAd);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { to: '/ad', title: 'Ads' },
        { title: 'Ad Details' },
    ];

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);
        console.log(isLoading)

        return () => clearTimeout(timer);
    }, []);

    return (
        ad && (
            <PageContainer title={ad?.title} description="this is Ad details page">
                <Box>
                    <Breadcrumb title={ad?.title} items={BCrumb} />
                    <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>

                        {/* todo: delete desactive ad */}
                    </Box>

                </Box>
            </PageContainer>
        )
    );
};

export default AdDetailsPage;
