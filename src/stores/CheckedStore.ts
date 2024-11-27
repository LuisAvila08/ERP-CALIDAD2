import { create } from 'zustand'

import CheckedStoreInterface, { checkedInterface } from '@/interfaces/Checked'

export const useCheckedStore = create<CheckedStoreInterface>((set) => ({
  checked: [] as checkedInterface[],
  setChecked: (data) => set({ checked: data })
}))
