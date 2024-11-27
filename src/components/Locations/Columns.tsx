
import { LocationInterface } from '@/interfaces/Shipments'
// import { IconEditCircle } from '@tabler/icons-react'
import { createColumnHelper } from '@tanstack/react-table'

// import useLocationStore from '@/stores/useLocationStore'

const columnHelper = createColumnHelper<LocationInterface>()

const columns = [
  columnHelper.accessor('location', {
    header: 'Ubicación',
    cell: (info) => `${info.getValue()} (${info.row.original.code})`
  }),

  columnHelper.accessor('name', {
    header: 'Razón Social',
    cell: (info) => `${info.getValue()} (${info.row.original.identity})`
  }),

  columnHelper.accessor('address', {
    header: 'Dirección',
    cell: (info) => info.getValue()
  })
  /*
  columnHelper.accessor('id', {
    header: 'Editar',
    cell: ({ row }) => {
      return (
        <div className='flex justify-center'>
          <IconEditCircle
            className='w-5 h-5 cursor-pointer'
            onClick={() => useLocationStore.setState({ locationID: row.original.id })}
          />
        </div>
      )
    }
  })
    */
]

export default columns
