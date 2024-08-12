'use client';

import React, { useEffect } from 'react';
import { Session } from 'next-auth';
import { IUser } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { userInfoAtom } from '@/store/user';
import { LogOut } from 'lucide-react';
import { signOutAction } from '@/lib/auth.action';

const Profile = ({
  session,
  currentUserInfo,
}: {
  session: Session | null;
  currentUserInfo: IUser | null;
}) => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    if (currentUserInfo) {
      setUserInfo(currentUserInfo);
    }
  }, [currentUserInfo, setUserInfo]);

  if (!session) {
    return (
      <Link href="/login">
        <Button size="sm" className="h-8">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userInfo?.avatar ? (
            <Image
              width={150}
              height={150}
              src={userInfo?.avatar}
              alt="Avatar"
              className="rounded-full w-8 h-8"
            />
          ) : (
            <span className="font-semibold ml-2 cursor-pointer">
              {userInfo?.username}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOutAction()}>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <Button variant="link" className="p-0 text-red-500 h-auto">
              Logout
            </Button>
          </DropdownMenuItem>
          {/* </form> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
