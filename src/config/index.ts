import { NavItem } from '@/types/nav';

export const navConfig: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Add',
    href: '/add',
  },
  {
    title: 'List',
    href: '/list',
  },
];

export const VALIDATION_MESSAGE = {
  name: 'Name must be in all capital letters.',
  nickname: 'Nickname is required.',
  age: 'Age should be between 5 and 15.',
};
