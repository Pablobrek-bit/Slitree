export type UserType = {
  id: string
  name: string
  email: string
}

export type AuthType = {
  user: UserType
  token: string
}
