export interface PriceListDetailsInterface {
  Articulo: string & number
  Descripción: string & number
  [ListName: string]: number
}

export interface PriceNewInterface {
  Articulo: string
  Descripción: string
}

export default PriceListDetailsInterface
