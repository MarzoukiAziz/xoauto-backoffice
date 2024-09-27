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
import { IconUserCircle, IconCar, IconPencil, IconDashboard, IconPoint } from '@tabler/icons';

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
];

export default Menuitems;
