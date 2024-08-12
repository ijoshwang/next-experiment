// export { auth as middleware } from "@/auth"

import { auth } from '@/auth'
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/config/route'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
