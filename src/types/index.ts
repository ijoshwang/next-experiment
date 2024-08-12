export interface ICollectedUser {
  id?: number
  name: string
  nickname: string
  age: number
  createdBy?: string
}

export interface IUser {
  id?: string
  username: string
  email: string
  password?: string
  avatar?: string
}
