import { ColumnDef } from '@tanstack/react-table'
import PriceListDetailsInterface from '@/interfaces/PriceListDetails'

export const generateTableColumns = (originalData: PriceListDetailsInterface[]): Array<ColumnDef<PriceListDetailsInterface>> => {
  const columnsFormatted: Array<ColumnDef<PriceListDetailsInterface>> = []

  if (originalData.length > 0) {
    for (const [key] of Object.entries(originalData[0])) {
      let newHeader = key

      if (key === 'Articulo') { newHeader = 'Artículo' }

      const transformedObject = {
        accessorKey: key,
        header: newHeader,
        cell: (key: any) => {
          if (typeof key.getValue() === 'number' && key.getValue() > 0) {
            return key.getValue().toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })
          }

          if (typeof key.getValue() === 'number' && key.getValue() === 0) { return '-' }

          return key.getValue()
        }
      }
      columnsFormatted.push(transformedObject)
    }

    return columnsFormatted
  }

  return columnsFormatted
}

export default generateTableColumns
