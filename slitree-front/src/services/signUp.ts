import { UserType } from '@/@types/User'
import { api } from '@/api'
import { UserRegisterError } from '@/errors/UserRegisterError'

export type SignUpParams = {
  email: string
  password: string
  name: string
}

export async function signUp({ email, password, name }: SignUpParams) {
  try {
    const { data } = await api.post<UserType>('/users/register', {
      email,
      password,
      name,
    })

    if (!data) {
      throw new UserRegisterError()
    }

    return data
  } catch (error) {
    throw new UserRegisterError()
  }
}
