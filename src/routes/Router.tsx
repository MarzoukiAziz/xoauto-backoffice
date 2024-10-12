import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

import AuthGuard from 'src/guards/authGuard/AuthGuard';
import GuestGuard from 'src/guards/authGuard/GuestGaurd';

/* ****Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/TwoSteps')));

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));

/* ****Ads***** */
const AdsPage = Loadable(lazy(() => import('../views/ads/ads-listing/AdsPage')));
const AdDetailsPage = Loadable(lazy(() => import('../views/ads/ad-details/AdDetailPage')));
const AdUpdatePage = Loadable(lazy(() => import('../views/ads/ad-update/AdUpdatePage')));

/* ****New Cars***** */
const NewAdsPage = Loadable(lazy(() => import('../views/new/ads-listing/NewAdsPage')));

/* ****Blog***** */
const ArticlesPage = Loadable(lazy(() => import('../views/blog/articles-listing/ArticlesPage')));
const ArticleDetailsPage = Loadable(
  lazy(() => import('../views/blog/article-details/ArticleDetailsPage')),
);
const ArticleFormPage = Loadable(lazy(() => import('../views/blog/article-form/ArticleFormPage')));
const ArticleUpdatePage = Loadable(
  lazy(() => import('../views/blog/article-update/ArticleUpdatePage')),
);
const BlogSettingsPage = Loadable(
  lazy(() => import('../views/blog/blog-settings/BlogSettingsPage')),
);

/* ****Users***** */
const UsersPage = Loadable(lazy(() => import('../views/user/users-listing/UsersPage')));
const UserDetailsPage = Loadable(lazy(() => import('../views/user/user-details/UserDetailsPage')));

/* ****Settings***** */
const BrandSettingsPage = Loadable(lazy(() => import('../views/settings/Brand/BrandSettingsPage')));
const ModelSettingsPage = Loadable(lazy(() => import('../views/settings/Model/ModelSettingsPage')));
const EnergySettingsPage = Loadable(
  lazy(() => import('../views/settings/Energy/EnergySettingsPage')),
);
const CategorySettingsPage = Loadable(
  lazy(() => import('../views/settings/Category/CategorySettingsPage')),
);
const ColorSettingsPage = Loadable(lazy(() => import('../views/settings/Color/ColorSettingsPage')));
const RegionSettingsPage = Loadable(
  lazy(() => import('../views/settings/Region/RegionSettingsPage')),
);
const EquipmentsSettingsPage = Loadable(
  lazy(() => import('../views/settings/Equipments/EquipmentSettingsPage')),
);
const NewSettingsPage = Loadable(lazy(() => import('../views/settings/New/NewSettingsPage')));

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
      { path: '/ad/', element: <AdsPage /> },
      { path: '/ad/edit/:id', element: <AdUpdatePage /> },
      { path: '/ad/:id', element: <AdDetailsPage /> },
      { path: '/new/', element: <NewAdsPage /> },
      { path: '/blog/', element: <ArticlesPage /> },
      { path: '/blog/settings', element: <BlogSettingsPage /> },
      { path: '/blog/article/:id', element: <ArticleDetailsPage /> },
      { path: '/blog/new', element: <ArticleFormPage /> },
      { path: '/blog/update', element: <ArticleUpdatePage /> },
      { path: '/users/', element: <UsersPage /> },
      { path: '/user/:id', element: <UserDetailsPage /> },
      { path: '/settings/new', element: <NewSettingsPage /> },
      { path: '/settings/brands', element: <BrandSettingsPage /> },
      { path: '/settings/models', element: <ModelSettingsPage /> },
      { path: '/settings/energies', element: <EnergySettingsPage /> },
      { path: '/settings/categories', element: <CategorySettingsPage /> },
      { path: '/settings/colors', element: <ColorSettingsPage /> },
      { path: '/settings/regions', element: <RegionSettingsPage /> },
      { path: '/settings/equipments', element: <EquipmentsSettingsPage /> },

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
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/confirm-phone/:phone', element: <TwoSteps /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
