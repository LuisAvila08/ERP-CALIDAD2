import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { IconFileSpreadsheet, IconUsersPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API, USERS, ALL, INTELISIS_USERS, AUTH, CREATE } from '@/config/Constant'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogHeader } from '@/components/ui/dialog'
import Combobox, { ComboboxOptions } from '@/components/ui/Combobox'
import { Input } from '@/components/ui/input'
import { OptionInterface } from '@/interfaces/Shipments'
import { UsuarioAttributes } from '@/types/Users'
import { useToast } from '@/components/ui/use-toast'
import { loggedUserInterface } from '@/interfaces/User'

const UsersContent = (): JSX.Element => {
  const [users, setUsers] = useState([])
  const [IntelisisUsers, setIntelisisUsers] = useState<OptionInterface[]>([])
  const [selectedIntelisisUser, setSelectedIntelisisUser] = useState<string | string[]>('')
  const [roleSelected, setRoleSelected] = useState<string | string[]>('')
  const [branchSelected, setBranchSelected] = useState<string | string[]>('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [branchesFiltered, setBranchesFiltered] = useState<OptionInterface[]>([])
  const [rolesFiltered, setRolesFiltered] = useState<OptionInterface[]>([])

  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const [reload, setReload] = useState<number>(Date.now())

  const [userError, setUserError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [branchError, setBranchError] = useState(false)

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

  const roles = [
    {
      label: 'Administrador',
      value: 'admin'
    },
    {
      label: 'Usuario',
      value: 'user'
    },
    {
      label: 'Super Administrador',
      value: 'root'
    },
    {
      label: 'Logística',
      value: 'logistic'
    },
    {
      label: 'Marketing',
      value: 'marketing'
    },
    {
      label: 'Operaciones',
      value: 'operations'
    }
  ]

  const branches = [
    {
      label: 'Guadalajara',
      value: 'GDL'
    },
    {
      label: 'Ciudad de México',
      value: 'CDMX'
    },
    {
      label: 'Mexicali',
      value: 'MXL'
    },
    {
      label: 'Global',
      value: 'TARA'
    }
  ]

  useEffect(() => {
    if (user.role === 'operations') {
      const newBranches = branches.filter(branch => branch.value !== 'TARA')
      setBranchesFiltered(newBranches)
    } else {
      setBranchesFiltered(branches)
    }

    if (user.role === 'operations') {
      const newRoles = roles.filter(role => role.value === 'user')
      setRolesFiltered(newRoles)
    } else {
      setRolesFiltered(roles)
    }
  }, [user])

  useEffect(() => {
    const fetUsers = async (): Promise<void> => {
      const token: string = localStorage.getItem('token') ?? ''
      const users = await axios.get(`${API}${USERS}${ALL}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        params: {
          user: user?.username,
          role: user?.role
        }
      })
      if (users.status === 200) {
        setUsers(users.data.users)
      }
    }

    if (user !== undefined) {
      fetUsers().then(() => { }).catch(() => { })
    }
  }, [reload, user])

  useEffect(() => {
    const fetUsers = async (): Promise<void> => {
      const token: string = localStorage.getItem('token') ?? ''
      const users = await axios.get(`${API}${USERS}${INTELISIS_USERS}`, { headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` } })
      if (users.status === 200) {
        const refactorUsers = users.data.IntelisisUser.map((user: UsuarioAttributes) => {
          return {
            label: `${user.Usuario} - ${user.Nombre as string}`,
            value: user.Usuario
          }
        })

        setIntelisisUsers(refactorUsers)
      }
    }

    fetUsers().then(() => { }).catch(() => { })
  }, [])

  const getRoleBadge = (role: string): JSX.Element => {
    switch (role) {
      case 'admin':
        return (
          <Badge className='bg-green-700'>
            Administrador
          </Badge>
        )

      case 'user':
        return (
          <Badge className='bg-blue-700'>
            Usuario
          </Badge>
        )

      case 'root':
        return (
          <Badge className='bg-red-700'>
            Super Administrador
          </Badge>
        )

      case 'operations':
        return (
          <Badge className='bg-yellow-700'>
            Operaciones
          </Badge>
        )
      default:
        return <Badge variant='outline'>No Identificado</Badge>
    }
  }

  const clearSelected = (): void => {
    setSelectedIntelisisUser('')
    setRoleSelected('')
    setBranchSelected('')
    setPassword('')
    setPasswordConfirm('')
    setUserError(false)
    setPasswordError(false)
    setPasswordConfirmError(false)
    setRoleError(false)
    setBranchError(false)
  }

  const createUser = async (user: { username: string, password: string, role: string, location: string }): Promise<void> => {
    const token: string = localStorage.getItem('token') ?? ''
    const response = await axios.post(`${API}${AUTH}${CREATE}`, user, { headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` } })
    if (response.status === 201) {
      clearSelected()
      setOpen(false)
      toast({
        title: 'Creado',
        description: 'El usuario se ha creado correctamente',
        variant: 'default',
        duration: 2000
      })
    }
  }

  const handleCreateUser = (): void => {
    if (selectedIntelisisUser === '') setUserError(true)
    if (password === '') setPasswordError(true)
    if (password !== passwordConfirm) setPasswordConfirmError(true)
    if (roleSelected === '') setRoleError(true)
    if (branchSelected === '') setBranchError(true)

    createUser({
      username: selectedIntelisisUser as string,
      password,
      role: roleSelected as string,
      location: branchSelected as string
    }).then(() => {
      setReload(Date.now())
    }).catch(() => { })
  }

  return (

    <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='all'>Todos</TabsTrigger>
            <TabsTrigger value='active'>Activos</TabsTrigger>
            <TabsTrigger value='archived' className='hidden sm:flex'>
              Archivados
            </TabsTrigger>
          </TabsList>
          <div className='flex items-center gap-2 ml-auto'>
            <Button size='sm' variant='outline' className='gap-1 h-7'>
              <IconFileSpreadsheet stroke={2} className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Exportar
              </span>
            </Button>

            <Dialog
              open={open}
              onOpenChange={() => {
                clearSelected()
              }}
            >
              <DialogTrigger asChild>
                <Button size='sm' className='gap-1 h-7' onClick={() => setOpen(true)}>
                  <IconUsersPlus stroke={2} className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Agregar Nuevo Usuario
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-11/12 md:w-1/2'>
                <DialogHeader>
                  <DialogTitle>Dar de Alta Nuevo Usuario</DialogTitle>
                  <DialogDescription>
                    Para dar de alta un usuario, complete los siguientes campos.
                  </DialogDescription>
                </DialogHeader>

                <div className='grid gap-4 py-4'>
                  <div className='grid items-center grid-cols-5 gap-4'>
                    <Combobox
                      options={IntelisisUsers as ComboboxOptions[]}
                      selected={selectedIntelisisUser}
                      placeholder='Seleccione Usuario Intelisis'
                      onChange={(value) => {
                        setSelectedIntelisisUser(value)
                        setUserError(false)
                      }}
                      mode='single'
                      className={userError ? 'text-primary border-primary' : ''}
                    />
                    <Input
                      type='password' placeholder='Contraseña' onChangeCapture={(e) => {
                        setPassword(e.currentTarget.value)
                        setPasswordError(false)
                      }} className={passwordError ? 'text-primary border-primary' : ''}
                    />
                    <Input
                      type='password' placeholder='Repetir Contraseña' onChangeCapture={(e) => {
                        setPasswordConfirm(e.currentTarget.value)
                        setPasswordConfirmError(false)
                      }} className={passwordConfirmError ? 'text-primary border-primary' : ''}
                    />
                    <Combobox
                      options={rolesFiltered as ComboboxOptions[]}
                      selected={roleSelected}
                      onChange={(value) => {
                        setRoleError(false)
                        setRoleSelected(value)
                      }}
                      mode='single'
                      placeholder='Rol'
                      className={roleError ? 'text-primary border-primary' : ''}
                    />
                    <Combobox
                      options={branchesFiltered as ComboboxOptions[]}
                      selected={branchSelected}
                      onChange={(value) => {
                        setBranchSelected(value)
                        setBranchError(false)
                      }}
                      mode='single'
                      placeholder='Locación'
                      className={branchError ? 'text-primary border-primary' : ''}
                    />
                  </div>
                  <div className='grid items-center grid-cols-5 gap-4'>
                    <div>
                      {userError && <p className='text-primary'>El usuario es requerido</p>}
                    </div>
                    <div>
                      {passwordError && <p className='text-primary'>La contraseña es requerida</p>}
                    </div>
                    <div>
                      {passwordConfirmError && <p className='text-primary'>La contraseñas no coinciden</p>}
                    </div>
                    <div>
                      {roleError && <p className='text-primary'>El rol es requerido</p>}
                    </div>
                    <div>
                      {branchError && <p className='text-primary'>La locación es requerida</p>}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant='outline' onClick={() => setOpen(false)}>Cancelar</Button>
                  </DialogClose>
                  <Button variant='default' onClick={handleCreateUser}>Dar de Alta</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>
                Administración de Usuarios del Sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Locación</TableHead>
                    <TableHead>
                      <span className='sr-only'>Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0
                    ? (
                        users.map((user: any) => (
                          <TableRow key={user.id}>
                            <TableCell className='font-medium'>{user.username}</TableCell>
                            <TableCell>{user?.IntelisisUser?.Nombre}</TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell>{user.location}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup='true'
                                    size='icon'
                                    variant='ghost'
                                  >
                                    <MoreHorizontal className='w-4 h-4' />
                                    <span className='sr-only'>Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                  <DropdownMenuItem>Editar</DropdownMenuItem>
                                  <DropdownMenuItem>Archivar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )
                    : (
                      <TableRow>
                        <TableCell colSpan={5} className='text-center'>
                          No hay registros
                        </TableCell>
                      </TableRow>
                      )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>

  )
}

const Users = (): JSX.Element => {
  return (
    <Layout>
      <UsersContent />
    </Layout>
  )
}

export default Users
