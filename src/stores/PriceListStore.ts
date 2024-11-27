import { create } from 'zustand'

import PriceListStore from '@/interfaces/PriceListStore'

export const usePriceListStore = create<PriceListStore>((set) => ({
  reloadList: 0,
  setReloadList: () => set((state) => ({ reloadList: state.reloadList + 1 }))
}))
