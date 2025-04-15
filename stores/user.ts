import { defineStore } from 'pinia'

interface UserState {
    userId: string
    role: string
    token: string
    }

export const useAuthStore = defineStore('user', () => {
  const userData = ref<UserState | null>(null)
  const isLoggedIn = computed(() => !!userData.value)

  function setUser(data: UserState) {
    userData.value = data
  }


  function clearUser() {
    userData.value = null
  }

  // get token
  function getToken() {
    return userData.value?.token || null
  }

  return {
    userData,
    isLoggedIn,
    setUser,
    clearUser,
    getToken,
  }
})
