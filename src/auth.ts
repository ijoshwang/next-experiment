// import github from "next-auth/providers/github"
// import google from "next-auth/providers/google"
import bcrypt from 'bcryptjs'
import NextAuth, { CredentialsSignin } from 'next-auth'
import credentials from 'next-auth/providers/credentials'

import { findUserByEmail } from './lib/action'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // Session expires after 24 hours
    updateAge: 24 * 60 * 60, // Session updated only if older than 24 hours
  },
  providers: [
    // github,
    // google,
    credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        console.log('=====[CredentialsProvider]authorize', credentials)

        try {
          const user = await findUserByEmail(credentials?.email as string)

          if (!user) throw new Error('User name or password is not correct')

          if (!credentials?.password)
            throw new Error('Please provide your password.')

          const isPassowrdCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password as string
          )

          if (!isPassowrdCorrect)
            throw new Error('User name or password is not correct.')

          const { password, ...userWithoutPass } = user

          return userWithoutPass as any
        } catch (error: any) {
          console.log('---[auth]authorize error:', error.message)
          throw new CredentialsSignin(error.message)
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: any
      account: any
      user: any
    }) {
      console.log('=====[callback jwt]:', { token, account, user })

      // https://next-auth.js.org/configuration/callbacks#jwt-callback
      // When an account user exists, it is the first time to log in, and subsequent requests only contain token.
      if (account && token.email) {
        const findUser = await findUserByEmail(token.email)

        if (findUser) {
          token.id = findUser.id as string
        }
      }

      return token
    },

    async session({ token, session }: { session: any; token: any }) {
      console.log('=====[callback session]:', { session, token })

      if (token) {
        session.user.id = token.id
      }

      return session
    },
  },
})
