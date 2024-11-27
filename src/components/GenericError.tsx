const GenericError = (): JSX.Element => {
  return (
    <main className='grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold'>¡Error!</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>Algo salio mal</h1>
        <p className='mt-6 text-base leading-7'>¡Lo sentimos!, Algo no salio como lo esperábamos</p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href='/'
            className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            Ir a la pantalla principal
          </a>
          <a href='https://soporte.grupotarahumara.com.mx' className='text-sm font-semibold'>
            Contacta a Soporte  <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}

export default GenericError
