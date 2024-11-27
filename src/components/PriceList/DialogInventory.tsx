import { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PriceListDetailsInterface from '@/interfaces/PriceListDetails'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import axios from 'axios'
import { API, INVENTORY, LOT_SERIES } from '@/config/Constant'

const DialogInventory = ({ Article }: { Article: PriceListDetailsInterface }): JSX.Element => {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  const getInventory = async (): Promise<void> => {
    const res = await axios.get(`${API}${LOT_SERIES}${INVENTORY}/id/${Article.Articulo}`)

    if (res.status === 200) {
      setInventory(res.data)
    }
  }

  useEffect(() => {
    getInventory()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  return (
    <DialogContent className='sm:max-w-full md:w-[50vW]'>
      <DialogHeader>
        <DialogTitle>Inventario: <span className='font-bold text-primary'>{Article.Articulo}</span></DialogTitle>
        <DialogDescription>
          {Article.Descripción}
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-0 p-0 border'>
        <Table
          className='relative w-full h-10 border overflow-clip'
          divClassName='max-h-[50vh] overflow-y-auto'
        >
          <TableHeader className='sticky top-0 z-10 w-full h-10 bg-muted'>
            <TableRow>
              <TableHead>SerieLote</TableHead>
              <TableHead>Existencia</TableHead>
              <TableHead>Almacén</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? (
                <>
                  <TableRow key='1'>
                    <TableCell><Skeleton className='w-32 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-8 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-16 h-6' /></TableCell>
                  </TableRow>
                  <TableRow key='2'>
                    <TableCell><Skeleton className='w-32 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-8 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-16 h-6' /></TableCell>
                  </TableRow>
                  <TableRow key='3'>
                    <TableCell><Skeleton className='w-32 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-8 h-6' /></TableCell>
                    <TableCell><Skeleton className='w-16 h-6' /></TableCell>
                  </TableRow>
                </>
                )
              : (

                  inventory.map((inventory: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{inventory.SerieLote}</TableCell>
                      <TableCell>{inventory.Existencia}</TableCell>
                      <TableCell>{inventory.Alm.Almacen} - {inventory.Alm.Nombre}</TableCell>
                    </TableRow>
                  ))

                )}
          </TableBody>
        </Table>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default DialogInventory
