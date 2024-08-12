'use server'

import bcrypt from 'bcryptjs'
import { isRedirectError } from 'next/dist/client/components/redirect'

import { signIn, signOut } from '@/auth'
import { errorMessages } from '@/config/errorMessage'
import { IUser } from '@/types'
import { ErrorCode } from '@/types/error'

import { createUser, findUserByUsername } from './action'

export const handleGithubLogin = async () => {
  await signIn('github')
}

export const handleGoogleLogin = async () => {
  await signIn('google')
}

export const signOutAction = async () => {
  await signOut()
}

export const loginAction = async (formData: any) => {
  // const { email, password } = Object.fromEntries(formData)
  const { email, password } = formData

  try {
    const response = await signIn('credentials', {
      email,
      password,
      // redirect: false,
    })

    // return { success: true };
    return response
  } catch (err: any) {
    console.log('---loginAction err:', `[[[${err.message}]]]`)

    if (err.message.includes(ErrorCode.EmailNotRegistered)) {
      return { error: errorMessages.EmailNotRegistered }
    }

    if (err.message.includes(ErrorCode.WrongPassword)) {
      return { error: errorMessages.WrongPassword }
    }

    if (err.message.includes(ErrorCode.CredentialsSignin)) {
      return { error: errorMessages.CredentialsSignin }
    }

    if (isRedirectError(err)) {
      throw err
    }

    // other error, eg: network error
    return { error: errorMessages.DefaultLoginMessage }
  }
}

export const registerAction = async (prevState: any, formValues: any) => {
  const { username, email, password, img, confirmPassword } = formValues

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  try {
    // 1. Query whether the username is repeated
    const user = await findUserByUsername(username)

    if (user) {
      return { error: 'Username already exists' }
    }

    // 2. password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser: IUser = {
      username: username,
      email,
      password: hashedPassword,
      avatar: img,
    }

    // 3. Register user information written to user table.
    const createdUser = await createUser(newUser)

    console.log('---register action:', createdUser)

    return { success: true }
  } catch (error: any) {
    console.log('---register error obj:', error)
    let errorMsg = 'Register something went wrong!'
    const err = error.errors[0]
    console.log('---register err:', err)

    if (err) {
      let { code, field } = err.extensions
      errorMsg = err.message

      if (code === 'RECORD_NOT_UNIQUE' && field === 'email') {
        errorMsg = 'Email already exists'
      }
    }

    return { error: errorMsg }
  }
}
