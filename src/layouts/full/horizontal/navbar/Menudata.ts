import { IconChartDonut3, IconAperture, IconUserCircle } from '@tabler/icons';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
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
    title: 'Blog',
    icon: IconChartDonut3,
    href: '/blog/',
  },
];
export default Menuitems;
