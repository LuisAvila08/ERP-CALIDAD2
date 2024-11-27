export interface PriceListStore {
  reloadList: number
  setReloadList: (shouldReload: number) => void
}

export default PriceListStore
