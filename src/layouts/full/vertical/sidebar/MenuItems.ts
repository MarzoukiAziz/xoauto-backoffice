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
    title: 'Members',
    icon: IconUserCircle,
    children: [
      {
        id: uniqueId(),
        title: 'Users',
        icon: IconPoint,
        href: '/users/',
      },
      {
        id: uniqueId(),
        title: 'Admins',
        icon: IconPoint,
        href: '/admins/',
      },
    ],
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
    href: '/blog/',
  },
];

export default Menuitems;
