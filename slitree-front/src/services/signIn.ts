import { AuthType } from '@/@types/User'
import { api } from '@/api'
import { InvalidCredentialError } from '@/errors/InvalidCredentialsError'

export interface SignInParams {
  email: string
  password: string
}
export async function signIn({ email, password }: SignInParams) {
  try {
    const { data } = await api.post<AuthType>('/auth', { email, password })
    if (!data) {
      throw new InvalidCredentialError()
    }

    return data
  } catch (error) {
    throw new InvalidCredentialError()
  }
}
