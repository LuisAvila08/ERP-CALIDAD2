import { IconNetworkOff } from '@tabler/icons-react'

const Disconnected = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <section className='flex flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8'>
        <div className='flex flex-col items-center p-6'>
          <IconNetworkOff size={128} className='text-primary' />
          <h1 className='text-3xl font-bold text-center text-primary'>
            Sin conexión al servidor
          </h1>
          <p className='text-lg text-center'>
            Verifica tu conexión e inténtalo de nuevo
          </p>
        </div>
      </section>
    </div>
  )
}

export default Disconnected
