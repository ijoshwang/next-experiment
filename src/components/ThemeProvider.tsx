'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    // <NextThemesProvider {...props}>
    //   {children}
    // </NextThemesProvider>
    <>
      {isClient ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      ) : (
        <></>
      )}
    </>
  );
}
