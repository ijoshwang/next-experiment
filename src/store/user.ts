import { atom } from 'jotai'

import { IUser } from '@/types'

export const userInfoAtom = atom<IUser | null>(null)
