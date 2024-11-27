export interface checkedInterface {
  Articulo: string
  checked: boolean
}

export interface CheckedStoreInterface {
  checked: checkedInterface[]
  setChecked: (data: checkedInterface[]) => void
}

export default CheckedStoreInterface
