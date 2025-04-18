import { $fetch } from 'ofetch'
import { UserRole, type LoginResponse } from '@/types/auth'

interface RegisterData {
  companyName: string
  fName: string
  lName: string
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
      const response = await $fetch(baseURL + '/users/signup', {
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

    console.log("url", baseURL + `/users/check-email?email=${encodeURIComponent(email)}`)
    try {
      const response = await $fetch(`${baseURL}/users/check-email?email=lemi@gmail.com`, {
        method: 'GET',
      })
      console.log("response.exists", await response)
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

      var computedRole = response.companyUser[0].role as UserRole || UserRole.EMPLOYEE
      if (response.globalRole)  {
        computedRole = UserRole.SUPER_ADMIN
      }

      const responseData: LoginResponse = {
        ...response,
        role: computedRole,
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
