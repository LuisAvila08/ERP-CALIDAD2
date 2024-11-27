import { ReactNode, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconCoinFilled, IconLocationPin, IconReceipt, IconTimelineEvent, IconTruck, IconUsersGroup } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { loggedUserInterface } from '@/interfaces/User'

const Content = (): ReactNode => {
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

  return (
    <main className='grid items-start gap-4 p-4 sm:px-6 sm:py-0'>
      <div className='grid items-start gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>ERP 2 - Menú Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='mb-4 text-2xl'>Módulos</h1>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6'>

              {user !== undefined && ['root', 'admin'].includes(user.role) &&
                <Link to='/shipments' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                  <div className='mx-auto'>
                    <IconTruck size={64} stroke={2} />
                  </div>
                  <p>Cargas en Transito</p>
                </Link>}

              {
                // TODO: Aquí meter la validación de permisos
              }

              {user !== undefined && ['root', 'admin'].includes(user.role) &&
                <Link to='/receipt' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                  <div className='mx-auto'>
                    <IconReceipt size={64} stroke={2} />
                  </div>
                  <p>Acta de descarga</p>
                </Link>}

              {
                // TODO: Aquí meter la validación de permisos
              }

              {user !== undefined && ['root', 'admin', 'operations'].includes(user.role) &&
                <Link to='/users' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                  <div className='mx-auto'>
                    <IconUsersGroup size={64} stroke={2} />
                  </div>
                  <p>Usuarios</p>
                </Link>}

              <Link to='/prices' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                <div className='mx-auto'>
                  <IconCoinFilled size={64} stroke={2} />
                </div>
                <p>Lista de Precios</p>
              </Link>
            </div>

            {user !== undefined && ['root', 'admin'].includes(user.role) &&
              <>
                <Separator className='my-4' />
                <h1 className='mb-4 text-2xl'>Catálogos</h1>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6'>
                  <Link to='/locations' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                    <div className='mx-auto'>
                      <IconLocationPin size={64} stroke={2} />
                    </div>
                    <p>Ubicaciones</p>
                  </Link>

                  <Link to='/events' className='flex flex-col justify-between p-6 font-semibold text-center transition-all border rounded-lg shadow-lg bg-muted/25 hover:bg-muted/50'>
                    <div className='mx-auto'>
                      <IconTimelineEvent size={64} stroke={2} />
                    </div>
                    <p>Tipos de Evento</p>
                  </Link>
                </div>
              </>}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const Dashboard = (): ReactNode => {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}

export default Dashboard
