import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { IconBell } from '@tabler/icons-react'
import defaultUser from '@/assets/images/default-user.png'

const Notifications = (): JSX.Element => {
  return (
    <div className='relative'>
      <div className='absolute flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full -top-3 -right-3'>
        <span className='text-xs'>9+</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconBell className='w-6 h-6' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-8 w-96' align='center' side='bottom'>
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className='relative flex items-center w-full p-2 border rounded-xl bg-muted/50'>
              <span className='absolute top-0 right-0 w-3 h-3 mt-2 mr-2 text-xs bg-red-700 border rounded-full'>&nbsp;</span>
              <span className='absolute bottom-0 right-0 py-1 m-1 mr-3 text-xs font-semibold uppercase'>4:36 PM</span>

              <img
                className='w-12 h-12 rounded-full' alt='User Notification'
                src={defaultUser}
              />

              <div className='ml-5'>
                <h4 className='text-lg font-semibold leading-tight'>Juan Castellanos</h4>
                <p className='text-sm'>Se ha asignado transporte para la carga #000001</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className='relative flex items-center w-full p-2 border border-r rounded-xl bg-muted/50'>
              <span className='absolute top-0 right-0 w-3 h-3 mt-2 mr-2 text-xs bg-red-700 border rounded-full'>&nbsp;</span>
              <span className='absolute bottom-0 right-0 py-1 m-1 mr-3 text-xs font-semibold uppercase'>4:36 PM</span>

              <img
                className='w-12 h-12 rounded-full' alt='User Notification'
                src={defaultUser}
              />

              <div className='ml-5'>
                <h4 className='text-lg font-semibold leading-tight'>Juan Castellanos</h4>
                <p className='text-sm'>Se ha asignado transporte para la carga #000001</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className='relative flex items-center w-full p-2 border rounded-xl'>

              <span className='absolute bottom-0 right-0 py-1 m-1 mr-3 text-xs font-semibold uppercase'>4:36 PM</span>

              <img
                className='w-12 h-12 rounded-full' alt='User Notification'
                src={defaultUser}
              />

              <div className='ml-5'>
                <h4 className='text-lg font-semibold leading-tight'>Juan Castellanos</h4>
                <p className='text-sm'>Se ha asignado transporte para la carga #000001</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className='relative flex items-center w-full p-2 border rounded-xl'>

              <span className='absolute bottom-0 right-0 py-1 m-1 mr-3 text-xs font-semibold uppercase'>4:36 PM</span>

              <img
                className='w-12 h-12 rounded-full' alt='User Notification'
                src={defaultUser}
              />

              <div className='ml-5'>
                <h4 className='text-lg font-semibold leading-tight'>Juan Castellanos</h4>
                <p className='text-sm'>Se ha asignado transporte para la carga #000001</p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Notifications
