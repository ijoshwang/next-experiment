'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(targetTheme);
  };

  return (
    <Button
      variant="ghost"
      className="w-10 h-10 px-0"
      onClick={handleSwitchTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
