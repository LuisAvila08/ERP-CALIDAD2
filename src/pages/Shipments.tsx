import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { IconTruckDelivery, IconX } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import Combobox, { ComboboxOptions } from '@/components/ui/Combobox'
import {
  LocationInterface, OptionInterface, PurchaseInterface, ResponseLocations, ResponsePurchase, ResponsePurchaseDetails, ResponseAgents,
  AgentInterface, ShipmentInterface, ResponseShipments, ResponseShipmentDetails
} from '@/interfaces/Shipments'
import { API, PURCHASES, ALL, ID, AGENTS, LOCATIONS, SHIPMENTS } from '@/config/Constant'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { DateTime } from 'luxon'
// import { useToast } from '@/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

// interface ProviderDataInterface {
//   Proveedor: string
//   Nombre: string
//   RFC: string
//   Telefonos: string | null
// }

const ShipmentsContent = (): JSX.Element => {
  const [purchases, setPurchases] = useState<OptionInterface[]>([])
  const [purchaseSelected, setPurchaseSelected] = useState<string | string[]>([])
  const [loading] = useState(false)
  const [details, setDetails] = useState<any[]>([])
  const [agents, setAgents] = useState<OptionInterface[]>([])
  const [agentSelected, setAgentSelected] = useState<string | string[]>('')
  // const [providers, setProviders] = useState<OptionInterface[]>([])
  // const [providerSelected, setProviderSelected] = useState<string | string[]>('')
  // const [dataProviders, setDataProviders] = useState<ProviderDataInterface[]>([])
  const [agentData, setAgentData] = useState<AgentInterface[]>([])
  const [locations, setLocations] = useState<OptionInterface[]>([])
  const [comments, setComments] = useState<string>('')
  const [dataLocation, setDataLocation] = useState<LocationInterface[]>([])
  // const [provider] = useState<ProviderDataInterface | null>({
  //   Proveedor: '',
  //   Nombre: '',
  //   RFC: '',
  //   Telefonos: ''
  // })
  const [origin, setOrigin] = useState<string | string[]>('')
  const [dataOrigin, setDataOrigin] = useState<LocationInterface[]>([])
  const [destination, setDestination] = useState<string | string[]>('')
  const [dataDestination, setDataDestination] = useState<LocationInterface[]>([])
  const [shipmentTime, setShipmentTime] = useState<string>('')
  const [arrivalTime, setArrivalTime] = useState<string>('')
  const [shipments, setShipments] = useState<ShipmentInterface[]>([])
  const [reload] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<number>(0)
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentInterface | null>(null)
  // const { toast } = useToast()

  const printAgent = (agentID: string): string => {
    const agentName = agents.find(agent => agentID === agent.value)
    if (agentName != null) {
      return agentName.label
    }
    return agentID
  }

  useEffect(() => {
    console.log('agents:', agentData)
  }, [])

  const getShipmentDetails = async (id: number): Promise<ResponseShipmentDetails> => {
    const response = await axios.get(`${API}${SHIPMENTS}${ID}/${id}`)
    return response.data
  }

  const handleShowShipmentDetails = (id: number): void => {
    getShipmentDetails(id)
      .then(res => {
        const shipment = res?.shipment
        setShipmentDetails(shipment as ShipmentInterface)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const executeToast = (): void => {
  //   toast({
  //     variant: 'default',
  //     title: 'Registro Exitoso',
  //     description: 'Se ha registrado la solicitud de embarque'
  //   })
  // }

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault()
    console.log('Enviando datos...')

    try {
      const response = await fetch('http://localhost:3053/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
      })

      const result = await response.json()
      console.log(result) // Para ver la respuesta del backend
    } catch (error) {
      console.error('Error al registrar:', error)
    }
  }

  const getPurchases = async (): Promise<ResponsePurchase | null> => {
    const res = await axios.get(`${API}${PURCHASES}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  const getPurchaseDetails = async (): Promise<ResponsePurchaseDetails | null> => {
    const res = await axios.get(`${API}${PURCHASES}${ID}`, {
      params: {
        id: purchaseSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getAgents = async (): Promise<ResponseAgents | null> => {
    const res = await axios.get(`${API}${AGENTS}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  const getLocations = async (): Promise<ResponseLocations | null> => {
    const res = await axios.get(`${API}${LOCATIONS}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  /*
  const getProviders = async (): Promise<void> => {
    const res = await axios.get(`${API}${PROVIDERS}${ALL}`)
    return res.status === 200 ? res.data : null
  }
  */

  const getShipments = async (): Promise<ResponseShipments | null> => {
    const res = await axios.get(`${API}${SHIPMENTS}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  // const getDetailsbyShipment = async (id: number): Promise<ResponseShipmentDetails | null> => {
  //   const res = await axios.get(`${API}${PURCHASES}${SHIPMENTS}/${id}`)
  //   return res.status === 200 ? res.data : null
  // }

  const refactorPurchases = (data: PurchaseInterface[] | undefined): OptionInterface[] => {
    if (data !== undefined) {
      return data.map(item => ({
        label: item.MovID,
        value: item.ID.toString()
      }))
    }
    return []
  }

  const refactorAgents = (data: any[]): OptionInterface[] => {
    const map: { [key: string]: string } = {}
    const options = data.map(item => {
      map[item.Agente] = item.Nombre
      return {
        label: item.Nombre,
        value: item.Agente
      }
    })
    return options
  }

  /*
  const refactorProviders = (data: any[]): OptionInterface[] => {
    return data.map(item => ({
      label: `${item.Proveedor as string} - ${item.Nombre as string}`,
      value: item.Proveedor
    }))
  }
    */

  const refactorLocations = (data: LocationInterface[]): OptionInterface[] => {
    return data.map(item => ({
      label: `${item.location} - ${item.code}`,
      value: item.id.toString()
    }))
  }

  const showButton = (): boolean => {
    return purchaseSelected.length > 0 && agentSelected !== '' && origin !== '' && destination !== '' && shipmentTime !== '' && arrivalTime !== ''
  }

  const handleTarimasChange = (index: number, value: number): void => {
    const newDetails = [...details]
    newDetails[index].Cantidad = Number(value) * newDetails[index].Article.UnidadCantidad
    setDetails(newDetails)
  }

  const events = [
    { title: 'Pedido Confirmado', time: '2024-08-01 08:00', description: 'El pedido fue confirmado.', type: 'normal' },
    { title: 'En Preparación', time: '2024-08-02 09:30', description: 'El pedido está en preparación.', type: 'normal' },
    { title: 'En Camino', time: '2024-08-03 14:45', description: 'El pedido ha salido del almacén.', type: 'warning' },
    { title: 'Retraso', time: '2024-08-04 16:15', description: 'Hubo un retraso en la entrega.', type: 'critical' }
  ]

  // Último evento (el evento crítico o final)
  const lastEvent = {
    title: 'Entrega Estimada',
    time: '2024-08-05 10:00',
    description: 'El pedido llegará a su destino.',
    type: 'normal'
  }

  useEffect(() => {
    getPurchases()
      .then(data => {
        const refactor = refactorPurchases(data?.purchases)
        if (refactor.length > 0) setPurchases(refactor)
      })
      .catch(() => {
        console.log('Error getting purchases')
      })
  }, [])

  useEffect(() => {
    getLocations()
      .then(data => {
        const locations = data?.locations
        setDataLocation(locations as LocationInterface[])
        const refactor = refactorLocations((locations != null) ? locations : [])
        if (refactor.length > 0) setLocations(refactor)
      })
      .catch(() => {
        console.log('Error getting locations')
      })
  }, [])

  useEffect(() => {
    getShipments()
      .then(data => {
        const shipments = data?.shipments
        setShipments(shipments as ShipmentInterface[])
      })
      .catch(() => {
        console.log('Error getting shipments')
      })
  }, [reload])

  useEffect(() => {
    getAgents()
      .then(data => {
        setAgentData(data?.agents as AgentInterface[])
        setAgents(refactorAgents(data?.agents as AgentInterface[]))
      })
      .catch(() => {
        console.log('Error getting agents')
      })
  }, [])

  /*
  useEffect(() => {
    getProviders()
      .then((data: any) => {
        setDataProviders(data?.providers)
        setProviders(refactorProviders(data?.providers))
      })
      .catch(() => {
        console.log('Error getting providers')
      })
  }, [])
  */

  // useEffect(() => {
  //   if (providerSelected !== '') {
  //     const provider = dataProviders?.find(item => item.Proveedor === providerSelected)
  //     setProvider(provider as ProviderDataInterface)
  //   }
  // }, [providerSelected])

  // useEffect(() => {
  //   if (selectedShipment > 0) {
  //     const provider = dataProviders?.find(item => item.Proveedor === shipmentDetails?.provider)
  //     setProvider(provider as ProviderDataInterface)
  //   }

  //   const origin = dataLocation.find(item => item.id === shipmentDetails?.origin)
  //   const destination = dataLocation.find(item => item.id === shipmentDetails?.destination)

  //   if (origin != null) { setDataOrigin([origin]) }
  //   if (destination != null) { setDataDestination([destination]) }

  /*
    if (shipmentDetails !== null && shipmentDetails.id > 0) {
      getDetailsbyShipment(shipmentDetails?.id)
        .then(data => {
          console.log(data)
        // setDetails(data?.details)
        })
        .catch(() => {
          console.log('Error getting shipment details')
        })
    }
  }, [selectedShipment, shipmentDetails])
  */

  useEffect(() => {
    if (purchaseSelected.length > 0) {
      getPurchaseDetails()
        .then(data => {
          setDetails(data?.purchases as PurchaseInterface[])
        })
        .catch(() => {
          console.log('Error getting purchase details')
        })
    }
  }, [purchaseSelected])

  useEffect(() => {
    console.log('Comentario', comments)
  }, [comments])

  return (
    <>
      <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        <div className='grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Crear Embarque</CardTitle>
            </CardHeader>

            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                {/* Primera columna: OC, Origen, Destino */}
                <div>
                  {/* Orden de Compra */}
                  <div className='flex items-center mb-4'>
                    <Combobox
                      placeholder='Orden de Compra'
                      mode='multiple'
                      options={purchases as ComboboxOptions[]}
                      selected={purchaseSelected}
                      onChange={(value) => setPurchaseSelected(value)}
                      className='w-full'
                    />
                    {purchaseSelected.length > 0 && (
                      <Button size='icon' className='ml-2' onClick={() => { setPurchaseSelected([]); setDetails([]) }}>
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>

                  {/* Origen */}
                  <div className='flex items-center mb-4'>
                    <Combobox
                      placeholder='Origen'
                      mode='single'
                      options={locations.filter((item) => item.value !== destination) as ComboboxOptions[]}
                      selected={origin}
                      onChange={(value) => {
                        setOrigin(value)
                        setDataOrigin(dataLocation.filter((item) => item.id.toString() === value))
                      }}
                      className='w-full'
                    />
                    {origin && (
                      <Button size='icon' className='ml-2' onClick={() => { setOrigin(''); setDataOrigin([]) }}>
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>

                  {/* Destino */}
                  <div className='flex items-center'>
                    <Combobox
                      placeholder='Destino'
                      mode='single'
                      options={locations.filter((item) => item.value !== origin) as ComboboxOptions[]}
                      selected={destination}
                      onChange={(value) => {
                        setDestination(value)
                        setDataDestination(dataLocation.filter((item) => item.id.toString() === value))
                      }}
                      className='w-full'
                    />
                    {destination && (
                      <Button size='icon' className='ml-2' onClick={() => { setDestination(''); setDataDestination([]) }}>
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Segunda columna: Agente, Fecha Solicitada, Fecha Tentativa */}
                <div>
                  {/* Agente */}
                  <div className='flex items-center mb-4'>
                    <Combobox
                      placeholder='Agente'
                      mode='single'
                      options={agents as ComboboxOptions[]}
                      selected={agentSelected}
                      onChange={(value) => setAgentSelected(value)}
                      className='w-full'
                    />
                    {agentSelected && (
                      <Button size='icon' className='ml-2' onClick={() => setAgentSelected('')}>
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>

                  {/* Fecha Solicitada */}
                  <div className='mb-4'>
                    <Input
                      type='datetime-local'
                      className='w-full dark:[color-scheme:dark]'
                      onChange={(e) => setShipmentTime(e.target.value)}
                    />
                    <Label className='block mt-1 text-xs'>- Fecha Solicitada</Label>
                  </div>

                  {/* Fecha Tentativa */}
                  <div>
                    <Input
                      type='datetime-local'
                      className='w-full dark:[color-scheme:dark]'
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                    <Label className='block mt-1 text-xs'>- Fecha Tentativa de Llegada</Label>
                  </div>
                </div>

                {/* Tercera columna: Comentarios */}
                <div>
                  <Input
                    className='w-full p-2 border rounded h-28'
                    placeholder='Comentarios'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    style={{ minHeight: '150px' }}
                  />
                </div>
              </div>

              {loading
                ? (
                  <Button disabled>Registrando...</Button>
                  )
                : (
                  <Button onClick={handleSubmit} disabled={!showButton()}>
                    Registrar
                  </Button>
                  )}

            </CardContent>
          </Card>

          <Tabs defaultValue='week'>
            <div className='flex items-center'>
              {/*
              <TabsList>
                <TabsTrigger value='week'>Semana</TabsTrigger>
              </TabsList>
              */}
              {/*
              <div className='flex items-center gap-2 ml-auto'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='gap-1 text-sm h-7'
                    >
                      <IconFilter className='h-3.5 w-3.5' />
                      <span className='sr-only sm:not-sr-only'>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size='sm'
                  variant='outline'
                  className='gap-1 text-sm h-7'
                >
                  <IconFile className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only'>Export</span>
                </Button>
              </div>
              */}
            </div>
            <TabsContent value='week'>
              <Card x-chunk='dashboard-05-chunk-3'>
                <CardHeader className='px-7' />
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Embarque</TableHead>
                        <TableHead>Orden de Compra</TableHead>
                        <TableHead>Estatus</TableHead>
                        <TableHead>Embarque</TableHead>
                        <TableHead>Ultima Actualización</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        shipments.length > 0
                          ? shipments.map((shipment) => (
                            <TableRow
                              key={shipment.id} onClick={() => {
                                handleShowShipmentDetails(shipment.id)
                                setSelectedShipment(shipment.id)
                              }}
                              className={shipment.id === selectedShipment ? 'bg-muted/50 border-primary border-2 cursor-pointer' : 'cursor-pointer'}
                            >
                              <TableCell>{shipment.id.toString().padStart(9, '0')}</TableCell>
                              {/* INGRESAR AL REGISTRO LA ORDEN DE COMPRA RELACIONADA */}
                              <TableCell>OC 46587</TableCell>
                              <TableCell>PENDIENTE</TableCell>
                              <TableCell>{
                              DateTime
                                .fromISO(shipment.shipmentDate)
                                .setZone('America/Mexico_City')
                                .setLocale('es-MX')
                                .toFormat('ff')
                              }
                              </TableCell>
                              <TableCell>
                                {
                              DateTime
                                .fromISO(shipment.updatedAt)
                                .setZone('America/Mexico_City')
                                .setLocale('es-MX')
                                .toFormat('ff')
                              }
                              </TableCell>
                            </TableRow>
                          ))
                          : (
                            <TableRow>
                              <TableCell colSpan={6} className='text-center'>No hay Ordenes de Seguimiento</TableCell>
                            </TableRow>
                            )
                      }

                    </TableBody>

                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
          <CardHeader className='flex flex-row items-start bg-muted/50'>
            <div className='grid gap-0.5'>
              <CardTitle className='flex items-center gap-2 text-lg group'>
                Embarque: <span className='font-bold'>{selectedShipment > 0 ? selectedShipment.toString().padStart(9, '0') : 'Nueva Solicitud'}</span>
                {/* }
                <Button
                  size='icon'
                  variant='outline'
                  className='w-6 h-6 transition-opacity opacity-0 group-hover:opacity-100'
                >
                  <IconCopy className='w-3 h-3' />
                  <span className='sr-only'>Copy Order ID</span>
                </Button>
                */}
              </CardTitle>

              {selectedShipment > 0
                ? (
                  <CardDescription>
                    Fecha de Solicitud de Embarque: {DateTime.fromISO(shipmentDetails?.createdAt as string).toFormat('ff')}
                  </CardDescription>
                  )
                : <Skeleton className='h-4 w-50' />}

            </div>
            {/*
            <div className='flex items-center gap-1 ml-auto'>
              <Button size='sm' variant='outline' className='h-8 gap-1'>
                <IconTruck className='h-3.5 w-3.5' />
                <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                  Rastro del Embarque
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='outline' className='w-8 h-8'>
                    <IconMenu className='h-3.5 w-3.5' />
                    <span className='sr-only'>More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            */}
          </CardHeader>
          {
            selectedShipment > 0
              ? (
                <CardContent className='p-6 text-sm'>
                  <div className='grid gap-3'>
                    <div className='font-semibold'>Detalle de la Orden de Compra</div>
                    <ScrollArea className='max-h-[25vh]'>
                      <ul className='grid gap-3'>
                        {details.length > 0
                          ? (
                              details.map((item) => (
                                <li className='flex items-center justify-between' key={item.Renglon}>
                                  <span className='text-muted-foreground'>
                                    {item.Articulo} - {item.Article.UnidadCantidad}
                                  </span>
                                  <span>x ({item.Cantidad / item.Article.UnidadCantidad})</span>
                                </li>
                              ))
                            )
                          : (
                            <li className='flex items-center justify-between'>
                              <Skeleton className='w-full h-16' />
                            </li>
                            )}
                      </ul>
                    </ScrollArea>
                  </div>

                  <Separator className='my-4' />

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>Punto Origen</div>
                      <div className='grid gap-0.5 not-italic text-muted-foreground'>
                        {dataOrigin !== undefined && dataOrigin.length > 0
                          ? (
                            <>
                              <p className='font-bold'>{dataOrigin[0]?.location} - {dataOrigin[0].code}</p>
                              <p className='font-semibold'>{dataOrigin[0].name}</p>
                              <p className='text-xs'>{dataOrigin[0].address}</p>
                            </>
                            )
                          : (
                            <Skeleton className='h-20 w-45' />
                            )}
                      </div>
                    </div>

                    <div className='grid gap-3 text-right auto-rows-max'>
                      <div className='font-semibold'>Punto Destino</div>
                      <div className='grid gap-0.5 not-italic text-muted-foreground'>
                        {dataDestination !== undefined && dataDestination.length > 0
                          ? (
                            <>
                              <p className='font-bold'>{dataDestination[0].location} - {dataDestination[0].code}</p>
                              <p className='font-semibold'>{dataDestination[0].name}</p>
                              <p className='text-xs'>{dataDestination[0].address}</p>
                            </>
                            )
                          : (
                            <Skeleton className='h-20 w-45' />
                            )}
                      </div>
                    </div>
                  </div>

                  <Separator className='my-4' />

                  {/* Timeline Button and Dialog */}
                  <div className='flex justify-center my-4'>
                    <div className='relative w-full'>
                      {/* Línea horizontal */}
                      <div className='absolute w-full h-1 bg-gray-300 rounded-full' />

                      {/* Iterar sobre los eventos y crear un DialogTrigger para cada uno */}
                      {events.map((event, index) => (
                        <Dialog key={index}>
                          <DialogTrigger asChild>
                            <div
                              className={`absolute w-4 h-4 -translate-y-1/2 rounded-full cursor-pointer ${event.type === 'critical' ? 'bg-red-600' : event.type === 'warning' ? 'bg-yellow-600' : 'bg-gray-400'}`}
                              style={{ left: `${(index / (events.length - 1)) * 100}%` }}
                            />
                          </DialogTrigger>

                          <DialogContent className='w-[70vw]'>
                            <DialogHeader>
                              <DialogTitle>{event.title}</DialogTitle>
                              <DialogDescription>
                                <p>{event.time}</p>
                                <p>{event.description}</p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      ))}

                      {/* Último evento con IconTruckDelivery */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className='absolute -translate-x-1/2' style={{ left: '100%' }}>
                            <IconTruckDelivery className='w-6 h-6'>
                              <FontAwesomeIcon icon={faTruck} size='1x' />
                            </IconTruckDelivery>
                          </div>
                        </DialogTrigger>

                        <DialogContent className='w-[70vw]'>
                          <DialogHeader>
                            <DialogTitle>{lastEvent.title}</DialogTitle>
                            <DialogDescription>
                              <p>{lastEvent.time}</p>
                              <p>{lastEvent.description}</p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <Separator className='my-4' />

                  <div className='grid gap-3'>
                    <div className='font-semibold'>Solicitante</div>
                    {agentSelected !== '' || selectedShipment > 0
                      ? (
                        <div className='text-muted-foreground'>
                          {agentSelected !== '' ? printAgent(agentSelected as string) : printAgent(shipmentDetails?.agent as string)}
                        </div>
                        )
                      : (
                        <Skeleton className='w-40 h-4' />
                        )}
                  </div>

                  <Separator className='my-4' />

                  {/* <div className='grid gap-3'>
                    <div className='font-semibold'>Información del Transporte</div>
                    <dl className='grid gap-3'>
                      {providerSelected !== '' || selectedShipment > 0
                        ? (
                          <>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Linea de Transporte</dt>
                              <dd>{provider?.Nombre}</dd>
                            </div>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>RFC</dt>
                              <dd>
                                <a href='tel:'>{provider?.RFC}</a>
                              </dd>
                            </div>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Teléfono</dt>
                              <dd>
                                <a href='tel:'>{provider?.Telefonos}</a>
                              </dd>
                            </div>
                          </>
                          )
                        : (
                          <Skeleton className='w-full h-12' />
                          )}
                    </dl>
                  </div> */}
                </CardContent>

                )
              : (
                <>
                  <CardContent className='p-6 text-sm'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>Detalle de la Orden de Compra</div>
                      <ScrollArea className='max-h-[25vh]'>
                        <ul className='grid gap-3'>
                          <li className='flex items-center justify-between'>
                            <span className='font-bold text-muted-foreground'>Artículo</span>
                            <span className='pr-4 font-bold'>Tarimas</span>
                          </li>
                          {details.length > 0
                            ? (
                                details.map((item, index) => (
                                  <li className='flex items-center justify-between' key={item.Renglon}>
                                    <span className='text-muted-foreground'>{item.Articulo}</span>
                                    <Input
                                      type='number'
                                      value={Math.ceil(item.Cantidad / item.Article.UnidadCantidad)}
                                      onChange={(e) => handleTarimasChange(index, e.target.value as unknown as number)}
                                      className='w-16 pr-1 no-arrows'
                                    />
                                  </li>
                                ))
                              )
                            : (
                              <li className='flex items-center justify-between'>
                                <Skeleton className='w-full h-16' />
                              </li>
                              )}
                        </ul>
                      </ScrollArea>
                    </div>

                    <Separator className='my-4' />

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='grid gap-3'>
                        <div className='font-semibold'>Punto Origen</div>
                        <div className='grid gap-0.5 not-italic text-muted-foreground'>
                          {dataOrigin !== undefined && dataOrigin.length > 0
                            ? (
                              <>
                                <p className='font-bold'>{dataOrigin[0].location} - {dataOrigin[0].code}</p>
                                <p className='font-semibold'>{dataOrigin[0].name}</p>
                                <p className='text-xs'>{dataOrigin[0].address}</p>
                              </>
                              )
                            : <Skeleton className='h-20 w-45' />}
                        </div>
                      </div>
                      <div className='grid gap-3 text-right auto-rows-max'>
                        <div className='font-semibold'>Punto Destino</div>
                        <div className='grid gap-0.5 not-italic text-muted-foreground'>
                          {dataDestination.length > 0
                            ? (
                              <>
                                <p className='font-bold'>{dataDestination[0].location} - {dataDestination[0].code}</p>
                                <p className='font-semibold'>{dataDestination[0].name}</p>
                                <p className='text-xs'>{dataDestination[0].address}</p>
                              </>
                              )
                            : <Skeleton className='h-20 w-45' />}
                        </div>
                      </div>
                    </div>
                    <div className='grid items-center grid-cols-3 gap-4'>
                      <div className='grid gap-3'>
                        <div className='font-semibold'>Punto Origen</div>
                        <div className='grid gap-0.5 not-italic text-muted-foreground'>
                          {dataOrigin !== undefined && dataOrigin.length > 0
                            ? (
                              <>
                                <p className='font-bold'>{dataOrigin[0].location} - {dataOrigin[0].code}</p>
                                <p className='font-semibold'>{dataOrigin[0].name}</p>
                                <p className='text-xs'>{dataOrigin[0].address}</p>
                              </>
                              )
                            : <Skeleton className='h-20 w-45' />}
                        </div>
                      </div>

                      <div className='flex justify-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <IconTruckDelivery className='h-5.5 w-5.5'>
                              <FontAwesomeIcon icon={faTruck} size='2x' /> {/* Icono de camión */}
                            </IconTruckDelivery>
                          </DialogTrigger>
                          <DialogContent className='w-[70vw]'>
                            <DialogHeader>
                              <DialogTitle>Timeline Completo</DialogTitle>
                              <DialogDescription>
                                {/* Timeline Completo */}
                                <div className='timeline'>
                                  <ul className='relative pl-6 border-l-2 border-gray-300'>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-gray-400 rounded-full -left-2.5' />
                                      <strong>Embarque Cargado</strong> - 10:00 AM, 15/08/2024 <br />
                                      <span className='text-gray-500'>El embarque ha sido cargado correctamente.</span>
                                    </li>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-gray-400 rounded-full -left-2.5' />
                                      <strong>Salida a Ruta</strong> - 11:00 AM, 15/08/2024 <br />
                                      <span className='text-gray-500'>La unidad ha salido a la ruta establecida.</span>
                                    </li>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-gray-400 rounded-full -left-2.5' />
                                      <strong>Unidad en Tránsito</strong> - 02:00 PM, 15/08/2024 <br />
                                      <span className='text-gray-500'>La unidad se encuentra en tránsito hacia el destino.</span>
                                    </li>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-yellow-600 rounded-full -left-2.5' />
                                      <strong>Caída de mercancía</strong> (Advertencia) - 04:30 PM, 15/08/2024 <br />
                                      <span className='text-yellow-600'>Se reportó la caída de mercancía durante el tránsito.</span>
                                    </li>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-yellow-600 rounded-full -left-2.5' />
                                      <strong>Percance vial</strong> (Advertencia) - 05:00 PM, 15/08/2024 <br />
                                      <span className='text-yellow-600'>La unidad sufrió un percance vial que provocó retrasos.</span>
                                    </li>
                                    <li className='mb-8'>
                                      <div className='absolute w-4 h-4 bg-red-600 rounded-full -left-2.5 animate-pulse' />
                                      <strong className='text-red-600'>Unidad accidentada</strong> (Crítico) - 05:30 PM, 15/08/2024 <br />
                                      <span className='text-red-600'>La unidad ha tenido un accidente mayor.</span>
                                    </li>
                                  </ul>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                      </div>

                      <div className='grid gap-3 text-right auto-rows-max'>
                        <div className='font-semibold'>Punto Destino</div>
                        <div className='grid gap-0.5 not-italic text-muted-foreground'>
                          {dataDestination.length > 0
                            ? (
                              <>
                                <p className='font-bold'>{dataDestination[0].location} - {dataDestination[0].code}</p>
                                <p className='font-semibold'>{dataDestination[0].name}</p>
                                <p className='text-xs'>{dataDestination[0].address}</p>
                              </>
                              )
                            : <Skeleton className='h-20 w-45' />}
                        </div>
                      </div>
                    </div>

                    <Separator className='my-4' />

                    <div className='grid gap-3'>
                      <div className='font-semibold'>Solicitante</div>
                      {
                    agentSelected !== ''
                      ? (
                        <div className='text-muted-foreground'>
                          {printAgent(agentSelected as string)}
                        </div>
                        )
                      : (
                        <Skeleton className='w-40 h-4' />
                        )

                  }
                    </div>

                    <Separator className='my-4' />
                    {/* <div className='grid gap-3'>
                      <div className='font-semibold'>Información del Transporte</div>
                      <dl className='grid gap-3'>
                        {
                      providerSelected !== ''
                        ? (
                          <>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Linea de Transporte</dt>
                              <dd>{provider?.Nombre}</dd>
                            </div>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>RFC</dt>
                              <dd>
                                <a href='tel:'>{provider?.RFC}</a>
                              </dd>
                            </div>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Teléfono</dt>
                              <dd>
                                <a href='tel:'>{provider?.Telefonos}</a>
                              </dd>
                            </div>
                          </>
                          )
                        : (
                          <Skeleton className='w-full h-12' />
                          )
                    }
                      </dl>
                    </div> */}
                  </CardContent>
                </>
                )
          }
          <CardFooter className='flex flex-row items-center px-6 py-3 border-t bg-muted/50'>
            <div className='text-xs text-muted-foreground'>
              {selectedShipment > 0
                ? (
                  <span>
                    Última actualización:
                    <time dateTime={DateTime.fromISO(shipmentDetails?.createdAt as string).toISO() as string}>
                      {DateTime.fromISO(shipmentDetails?.createdAt as string).toFormat('ff')}
                    </time>
                  </span>
                  )
                : <Skeleton className='w-40 h-4' />}
            </div>
            {/*
            <Pagination className='w-auto ml-auto mr-0'>
              <PaginationContent>
                <PaginationItem>
                  <Button size='icon' variant='outline' className='w-6 h-6'>
                    <IconChevronLeft className='h-3.5 w-3.5' />
                    <span className='sr-only'>Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size='icon' variant='outline' className='w-6 h-6'>
                    <IconChevronRight className='h-3.5 w-3.5' />
                    <span className='sr-only'>Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            */}
          </CardFooter>
        </Card>
      </main>
    </>
  )
}

const Shipments = (): JSX.Element => {
  return (
    <Layout>
      <ShipmentsContent />
    </Layout>
  )
}

export default Shipments
