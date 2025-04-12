import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('accessToken')

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl + '/api',
    key: toValue(url),
    headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)
  console.log('🔗 Fetching:', config.public.apiBaseUrl + toValue(url)) // ✅ LOG THIS
  return useFetch(url, params) 
}
