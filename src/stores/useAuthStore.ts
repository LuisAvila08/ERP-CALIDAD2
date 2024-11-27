import { create } from 'zustand'

import loggedUserInterface from '@/interfaces/User'

interface AuthState {
  user: loggedUserInterface | null
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false })
}))

export default useAuthStore
