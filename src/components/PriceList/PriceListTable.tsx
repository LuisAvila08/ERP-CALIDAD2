import PriceListDetailsInterface from '@/interfaces/PriceListDetails'
import React from 'react'
import { DataTable } from './data-table'
import generateTableColumns from '@/lib/generateTableColumns'
import { Actions } from './columns'

interface PriceListTableProps {
  priceListDetails: PriceListDetailsInterface[]
}

const PriceListTable: React.FC<PriceListTableProps> = ({ priceListDetails }) => {
  const newColumns = generateTableColumns(priceListDetails)

  newColumns.unshift(Actions[1])
  newColumns.push(Actions[0])

  return <DataTable columns={newColumns} data={priceListDetails} />
}

export default PriceListTable
