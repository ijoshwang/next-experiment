import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'

import Header from '@/components/Header/Header'
import JotaiProviders from '@/components/JotaiProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {' '}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className={inter.className}>
        <JotaiProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>
              <div className="min-h-screen">
                <Header />
                <main className="w-full px-4 md:px-8 py-6 flex flex-col sm:max-w-7xl m-auto">
                  {children}
                </main>
              </div>
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </JotaiProviders>
      </body>
    </html>
  )
}
