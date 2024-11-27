import { create } from 'zustand'

interface LocationState {
  locationID: number
}

const useLocationStore = create<LocationState>((set) => ({
  locationID: 0,
  setLocationId: (id: number) => set({ locationID: id })
}))

export default useLocationStore
