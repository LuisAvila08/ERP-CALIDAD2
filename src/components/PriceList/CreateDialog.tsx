import React from 'react'
import { PriceListDetailsInterface } from '@/interfaces/PriceListDetails'
import DialogPrice from './DialogPrice'
import DialogLot from './DialogLot'
import DialogInventory from './DialogInventory'

const CreateDialog: React.FC<{ type: string, Article: PriceListDetailsInterface }> = ({ type, Article }) => {
  let dialog: JSX.Element

  switch (type) {
    case 'Price':
      dialog = <DialogPrice Article={Article} />
      break
    case 'Lot':
      dialog = <DialogLot Article={Article} />
      break
    case 'Inventory':
      dialog = <DialogInventory Article={Article} />
      break
    default:
      dialog = <></>
  }

  return dialog
}

export default CreateDialog
