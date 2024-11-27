export interface loggedUserInterface {
  id: number
  location: string
  mustUpdatePassword: boolean
  priceList: string | null
  role: string
  username: string
}

export default loggedUserInterface
