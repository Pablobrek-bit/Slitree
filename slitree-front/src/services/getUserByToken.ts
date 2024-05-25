import { UserType } from '@/@types/User'
import { api } from '@/api'

interface GetUserByTokenResponse {
  user: UserType
}

export async function getUserByToken(token: string) {
  const { data } = await api.get<GetUserByTokenResponse>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data.user
}
