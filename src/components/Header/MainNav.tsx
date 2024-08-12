'use client';

import { navConfig } from '@/config';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Presentation } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Presentation className="w-5 h-5" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {navConfig.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              (item.href === '/' && pathname === item.href) ||
                (item.href !== '/' && pathname?.startsWith(item.href))
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;
