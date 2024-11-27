export interface EventInterface {
  id: number
  description: string
  eventType: string
  createdAt: Date
  updatedAt: Date
}

export interface ResponseEvents {
  status: boolean
  message: string
  typeOfEvents?: EventInterface[]
}
