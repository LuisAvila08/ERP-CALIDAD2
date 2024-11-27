import { create } from 'zustand'

interface FilterValueState {
  value: string
  setValue: (newValue: string) => void
}

export const useFilterValue = create<FilterValueState>((set) => ({
  value: '',
  setValue: (newValue: string) => set({ value: newValue })
}))
