import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-react'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import Combobox from '../ui/Combobox'

const ShipmentPlaceHolder = (): JSX.Element => {
  return (
    <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='flex items-center gap-2 text-lg group'>
            Embarque: <Skeleton className='w-64 h-6' />
            <Button
              size='icon'
              variant='outline'
              className='w-6 h-6 transition-opacity opacity-0 group-hover:opacity-100'
            >
              <IconCopy className='w-3 h-3' />
            </Button>
          </CardTitle>
          <CardDescription />
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>

        <Combobox
          placeholder='Agregar Orden de Compra'
          mode='single'
          options={[]}
          selected=''
          onChange={(_value) => {

          }}
          className='w-full mb-4'
        />

        <div className='grid gap-3'>

          <div className='font-semibold'>Detalle de la Orden de Compra</div>

          <ul className='grid gap-3'>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
            <li className='flex items-center justify-between'>
              <Skeleton className='w-64 h-6' />
              <Skeleton className='w-12 h-6' />
            </li>
          </ul>
        </div>
        <Separator className='my-4' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-3'>
            <div className='font-semibold'>Agente</div>
            <address className='grid gap-0.5 not-italic text-muted-foreground'>
              <Skeleton className='w-64 h-6' />
            </address>
          </div>
          <div className='grid gap-3 auto-rows-max'>
            <div className='font-semibold'>Transportista</div>
            <div className='text-muted-foreground'>
              <Skeleton className='w-64 h-6' />
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-3'>
            <div className='font-semibold'>Punto de Origen</div>
            <address className='grid gap-0.5 not-italic text-muted-foreground'>
              <span>Tarahumara Mexicali</span>
            </address>
          </div>
          <div className='grid gap-3 auto-rows-max'>
            <div className='font-semibold'>Punto Destino</div>
            <div className='text-muted-foreground'>
              Tarahumara GDL
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='grid gap-3'>
          <div className='font-semibold'>Información del Transporte</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='text-muted-foreground'>Conductor</dt>
              <dd>Fulanito de Tal</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='text-muted-foreground'>Teléfono</dt>
              <dd>
                <a href='tel:'>33223268763</a>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  )
}
export default ShipmentPlaceHolder
