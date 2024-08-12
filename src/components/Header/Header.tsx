import React from 'react'

import { auth } from '@/auth'
import { getUserInfo } from '@/lib/action'

import MainNav from './MainNav'
import MobileNav from './MobileNav'
import ModeToggle from './ModeToggle'
import Profile from './Profile'

const Header = async () => {
  const session = await auth()
  const userInfo = await getUserInfo()
  console.log('---[Header]userInfo:', userInfo)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-8 flex h-14 sm:max-w-7xl items-center">
        <MainNav />

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-1">
            <ModeToggle />
            <Profile session={session} currentUserInfo={userInfo} />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
