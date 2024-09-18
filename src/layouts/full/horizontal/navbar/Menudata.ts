import { IconUserCircle, IconCar, IconPencil, IconDashboard } from '@tabler/icons';
import { uniqueId } from 'lodash';

const Menuitems = [
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
    href: '/blog/',
  },
];
export default Menuitems;
