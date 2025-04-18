import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'
import useAuthSession from '@/composables/useAuthSession'

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  const { getAccessToken } = useAuthSession()
  const accessToken = getAccessToken()


  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    key: toValue(url),
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)
  console.log('🔗 Fetching:', config.public.apiBaseUrl + toValue(url)) // ✅ LOG THIS
  return useFetch(url, params) 
}


export function useApiFetch<T>(url: string, options: any = {}) {
  const { getAccessToken } = useAuthSession()
  const accessToken = getAccessToken()
  const config = useRuntimeConfig()
  
  const baseURL = config.public.apiBaseUrl

  return $fetch<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
    baseURL,
  })
}
