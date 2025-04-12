import { useApi } from '~/composables/useApi'

export const useRegister = async (userData: {
  username: string
  email: string
  password: string
}) => {
  
  return useApi('/auth/signup', {
    method: 'POST',
    body: userData,
  })
}

export const useLogin = async (credentials: {
  email: string
  password: string
}) => {

  const { email, password } = credentials
  const response = await fetch('http://127.0.0.1:3003/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password }),
  })

  return response
}
