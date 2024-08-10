import React from 'react'
import MainNav from './MainNav'
import ModeToggle from './ModeToggle'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-8 flex h-14 sm:max-w-7xl items-center">
        <MainNav />

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-1">
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header