import { $fetch } from 'ofetch'
import type { LoginResponse } from '@/types/auth'

interface RegisterData {
  companyName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginCredentials {
  email: string
  password: string
}

const  useAuthApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  const register = async (userData: RegisterData): Promise<string> => {
    try {
      const response = await $fetch(baseURL + '/user/signup', {
        method: 'POST',
        body: userData,
      })
      return response
    } catch (error: any) {
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: error.data?.message || 'Signup failed',
      })
    }
  }

  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await $fetch(baseURL + `/user/signup?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      })
      return response.exists
    } catch (error: any) {
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: error.data?.message || 'Email check failed',
      })
    }
  }

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await $fetch(baseURL + '/auth/signin', {
        method: 'POST',
        body: credentials,
      })

      const responseData: LoginResponse = {
        ...response,
        role: response.companyUser.role,
      }

      return responseData
    } catch (error: any) {
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: error.data?.message || 'Login failed',
      })
    }
  }

  return {
    register,
    checkEmail,
    login,
  }
}

export default useAuthApi
