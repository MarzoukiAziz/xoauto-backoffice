import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

import AuthGuard from 'src/guards/authGuard/AuthGuard';
import GuestGuard from 'src/guards/authGuard/GuestGaurd';

/* ****Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Modern')));

/* ****Blog***** */
const ArticlesPage = Loadable(lazy(() => import('../views/blog/articles-listing/ArticlesPage')));
const ArticleDetailsPage = Loadable(lazy(() => import('../views/blog/article-details/ArticleDetailsPage')));
const ArticleFormPage = Loadable(lazy(() => import('../views/blog/article-form/ArticleFormPage')));


/* ****Users***** */
const UsersPage = Loadable(lazy(() => import('../views/user/UsersPage')));

const Router = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/blog/', element: <ArticlesPage /> },
      { path: '/blog/article/:id', element: <ArticleDetailsPage /> },
      { path: '/blog/new', element: <ArticleFormPage /> },
      { path: '/users/', element: <UsersPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <GuestGuard>
        <BlankLayout />
      </GuestGuard>
    ),
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
