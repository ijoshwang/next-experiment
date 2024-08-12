import { IUser } from '@/types';
import { atom } from 'jotai';

export const userInfoAtom = atom<IUser | null>(null);
