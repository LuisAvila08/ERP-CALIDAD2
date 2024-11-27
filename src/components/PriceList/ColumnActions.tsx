import React, { useState, useEffect } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { IconMenu } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { PriceListDetailsInterface } from '../../interfaces/PriceListDetails'
import CreateDialog from './CreateDialog'
import { loggedUserInterface } from '@/interfaces/User'

interface ColumnActionsProps {
  Article: PriceListDetailsInterface
}

const ColumnActions: React.FC<ColumnActionsProps> = ({ Article }) => {
  const [dialog, setDialog] = useState<string>('')

  const [user, setUser] = useState <loggedUserInterface>({
    id: 0,
    location: 'GDL',
    mustUpdatePassword: false,
    priceList: null,
    role: 'user',
    username: 'E-00000'
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user !== null) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleSelect = (type: string): void => {
    setDialog(type)
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-8 h-8 p-0'>
            <IconMenu className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {['admin', 'root', 'operations'].includes(user.role) &&
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={() => handleSelect('Price')}>
                  Actualizar Precio
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={() => handleSelect('Lot')}>
                  Especiales
                </DropdownMenuItem>
              </DialogTrigger>
            </>}
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => handleSelect('Inventory')}>
              Inventario
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateDialog type={dialog} Article={Article} />
    </Dialog>
  )
}

export default ColumnActions
