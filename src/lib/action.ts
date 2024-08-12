'use server'

import { auth } from '@/auth'
import { ICollectedUser, IUser } from '@/types'

import sql from './db'

export async function getCollectedUsers() {
  const response = await sql`SELECT * FROM collected_users;`

  return response as ICollectedUser[]
}

export async function addCollectedUser(
  data: ICollectedUser
): Promise<ICollectedUser> {
  console.log('---data:', data)
  const [newUser] = await sql`
    INSERT INTO collected_users (name, nickname, age)
    VALUES (${data.name}, ${data.nickname}, ${data.age})
    RETURNING *
  `

  return newUser as ICollectedUser
}

export async function findUserByEmail(
  email: string
): Promise<IUser | undefined> {
  const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  const user = users[0]

  return user as IUser
}

export async function findUserByUsername(
  username: string
): Promise<IUser | undefined> {
  const users = await sql`
    SELECT * FROM users WHERE username = ${username}
  `
  const user = users[0]

  return user as IUser
}

export const getUserInfo = async () => {
  const session = await auth()

  if (!session || !session.user) {
    console.log('---getSessionInfo:', 'Session not found')

    return null
  }

  try {
    const userId = session?.user.id as string
    const users = await sql`
    SELECT * FROM users WHERE id = ${userId}
  `

    if (users && users.length > 0) {
      return users[0] as IUser
    }

    return null
  } catch (error) {
    console.log('---getUserInfo error:', error)

    return null
  }
}

export async function createUser(newUser: IUser): Promise<IUser> {
  const result = await sql`
    INSERT INTO users (username, email, password, avatar)
    VALUES (${newUser.username}, ${newUser.email}, ${newUser.password}, ${newUser.avatar})
    RETURNING id, username, email, avatar
  `

  if (result.length === 0) {
    throw new Error('Failed to create user')
  }

  return result[0] as IUser
}
