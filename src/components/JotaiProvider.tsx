// providers.js (app directory)
'use client'

import { Provider } from 'jotai'

export default function JotaiProviders({ children }: { children: any }) {
  return <Provider>{children}</Provider>
}
