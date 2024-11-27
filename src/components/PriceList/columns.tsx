import { ColumnDef } from '@tanstack/react-table'
import PriceListDetailsInterface from '@/interfaces/PriceListDetails'
import ColumnActions from './ColumnActions'
import { Checkbox } from '../ui/checkbox'
import { useCheckedStore } from '@/stores/CheckedStore'
import { usePriceListStore } from '@/stores/PriceListStore'

const handleChecked = (event: React.MouseEvent<HTMLButtonElement>): void => {
  const buttonElement = event.currentTarget as HTMLButtonElement
  const accessKey = buttonElement.getAttribute('data-key')
  const checked = buttonElement.getAttribute('data-state')
  const actualChecked = useCheckedStore.getState().checked
  const index = actualChecked.findIndex(checked => checked.Articulo === accessKey)
  actualChecked[index].checked = checked !== 'checked'
  useCheckedStore.setState({ checked: actualChecked })
}

const handleCheckedAll = (event: React.MouseEvent<HTMLButtonElement>): void => {
  const buttonElement = event.currentTarget as HTMLButtonElement
  const checked = buttonElement.getAttribute('data-state')
  const actualChecked = useCheckedStore.getState().checked

  actualChecked.forEach(item => {
    item.checked = checked !== 'checked'
  })

  usePriceListStore.getState().setReloadList(1)
}

const isChecked = (key: string): boolean | undefined => {
  const actualChecked = useCheckedStore.getState().checked
  const item = actualChecked.find(checked => checked.Articulo === key)
  return (item != null) ? item.checked : false
}

export const Actions: Array<ColumnDef<PriceListDetailsInterface>> = [
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const article = row.original
      return (
        <ColumnActions Article={article} />
      )
    },
    filterFn: (row, _column: string, filterValue) => {
      const article = row.original.Articulo as string
      const description = row.original.Descripción as string

      return article.toLowerCase().includes(filterValue.toLowerCase()) || description.toLowerCase().includes(filterValue.toLowerCase())
    }
  },
  {
    accessorKey: 'checkbox',
    header: () => {
      return (
        <Checkbox defaultChecked onClick={handleCheckedAll} />
      )
    },
    cell: ({ row }) => {
      return <Checkbox data-key={row.original.Articulo} checked={isChecked(row.original.Articulo)} onClick={handleChecked} />
    }
  }
]
