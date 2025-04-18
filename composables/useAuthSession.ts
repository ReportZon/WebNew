
// made to centralize the authentication session management
// if we want to change the way we manage the session, we can do it in one place
// example: if we want to use local storage instead of cookies, we can do it here

import type { userSessionData } from "@/types/auth"


const  useAuthSession = () => {

  const isLoggedIn = () => {
    const token = useCookie('accessToken')
    const user = useCookie<userSessionData>('userData')
    if (token.value && user.value) {
      return true
    }
    return false
  }

  const setAccessToken = (token: string) => {
    const accessToken = useCookie('accessToken')
    accessToken.value = token
  }

  const setUserData = (userData: any) => {
    const user = useCookie<userSessionData>('userData')
    user.value = userData
  }

  const removeSession = () => {
    const accessToken = useCookie('accessToken')
    const user = useCookie('userData')
    accessToken.value = null
    user.value = null
  }

  const getUserRole = () => {
    const user = useCookie<userSessionData>('userData')
    const role = user.value ? user.value.role : null
    return role
  }

  const getUserData = () => {
    return useCookie<userSessionData>('userData').value
  }


  return {
    isLoggedIn,
    setAccessToken,
    setUserData,
    getAccessToken: () => useCookie('accessToken').value,
    getUserData,
    getUserRole,
    removeSession,
  }
}

export default useAuthSession
