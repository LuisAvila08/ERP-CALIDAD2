import { Skeleton } from '../ui/skeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableFooter } from '../ui/table'
import Progress from '../Progress'

const PriceListLoading = (): JSX.Element => {
  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow className='text-center bg-muted/50'>
            <TableHead>
              Artículo
            </TableHead>
            <TableHead>
              Descripción
            </TableHead>
            <TableHead>
              Lista
            </TableHead>
            <TableHead>
              Lista
            </TableHead>
            <TableHead>
              Lista
            </TableHead>
            <TableHead>
              Lista
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className='h-6 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-64' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-6 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-64' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-6 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-64' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-6 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-64' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-6 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-64' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Progress />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default PriceListLoading
