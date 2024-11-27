export interface SpecialPricesInterface {
  SPID: string
  SerieLote: string
  Precio: number
  Articulo: string
  Total: number
  Nota: string
}

export interface SpecialPricesResponseInterface {
  message: string
  response: [SpecialPricesInterface]
}
