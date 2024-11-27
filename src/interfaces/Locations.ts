export interface Location {
  id?: number
  location: string
  city: string
  estate: string
  code: string
  name: string
  identity: string
  address: string
  gps?: string | null
  references?: string
  longitude?: number
  latitude?: number
  createdAt?: string
  updatedAt?: string
  status?: boolean
  comments?: string
}
