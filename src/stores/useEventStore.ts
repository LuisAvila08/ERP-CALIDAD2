import { create } from 'zustand'

interface EventState {
  eventID: number
}

const useEventStore = create<EventState>((set) => ({
  eventID: 0,
  setEventId: (id: number) => set({ eventID: id })
}))

export default useEventStore
