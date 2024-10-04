import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconUserCircle,
  IconCar,
  IconPencil,
  IconDashboard,
  IconPoint,
  IconSettings,
} from '@tabler/icons';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserCircle,
    href: '/users/',
  },
  {
    id: uniqueId(),
    title: 'Ads',
    icon: IconCar,
    href: '/ad/',
  },
  {
    id: uniqueId(),
    title: 'Blog',
    icon: IconPencil,
    children: [
      {
        id: uniqueId(),
        title: 'Articles',
        icon: IconPoint,
        href: '/blog/',
      },
      {
        id: uniqueId(),
        title: 'Settings',
        icon: IconPoint,
        href: '/blog/settings',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: IconSettings,
    children: [
      {
        id: uniqueId(),
        title: 'Brands',
        icon: IconPoint,
        href: '/settings/brands',
      },
      {
        id: uniqueId(),
        title: 'Models',
        icon: IconPoint,
        href: '/settings/models',
      },
      {
        id: uniqueId(),
        title: 'Energies',
        icon: IconPoint,
        href: '/settings/energies',
      },
      {
        id: uniqueId(),
        title: 'Categories',
        icon: IconPoint,
        href: '/settings/categories',
      },
      {
        id: uniqueId(),
        title: 'Regions',
        icon: IconPoint,
        href: '/settings/regions',
      },
      {
        id: uniqueId(),
        title: 'Colors',
        icon: IconPoint,
        href: '/settings/colors',
      },
    ],
  },
];

export default Menuitems;
