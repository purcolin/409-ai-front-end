import { defineStore } from 'pinia'
import { login, logout } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/token'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    user: {},
    roles: []
  }),

  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    getRoles: state => state.roles
  },

  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
    setRoles(roles) {
      this.roles = roles
    },
    async login(userInfo) {
      try {
        const res = await login(userInfo)
        setToken(res.data)
        this.setToken(res.data)
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      try {
        await logout()
      } catch (error) {
        console.error('logout api call error', error)
      } finally {
        removeToken()
        this.setToken('')
        this.setUser({})
        this.setRoles([])
        router.replace('/login?redirect=' + router.currentRoute.value.fullPath)
      }
    },
  }
})