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
  ShipmentInterface, ResponseShipments, ResponseShipmentDetails
} from '@/interfaces/Shipments'
import { API, PURCHASES, ALL, ID, AGENTS, PROVIDERS, LOCATIONS, SHIPMENTS } from '@/config/Constant'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { DateTime } from 'luxon'
import { useToast } from '@/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface ProviderDataInterface {
  Proveedor: string
  Nombre: string
  RFC: string
  Telefonos: string | null
}

const ShipmentsContent = (): JSX.Element => {
  const [purchases, setPurchases] = useState<OptionInterface[]>([])
  const [purchaseSelected, setPurchaseSelected] = useState<string | string[]>([])
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<any[]>([])
  const [agents, setAgents] = useState<OptionInterface[]>([])
  const [agentSelected, setAgentSelected] = useState<string | string[]>('')
  const [providers, setProviders] = useState<OptionInterface[]>([])
  const [providerSelected, setProviderSelected] = useState<string | string[]>('')
  const [dataProviders, setDataProviders] = useState<ProviderDataInterface[]>([])
  const [locations, setLocations] = useState<OptionInterface[]>([])
  const [comments, setComments] = useState<string>('')
  const [dataLocation, setDataLocation] = useState<LocationInterface[]>([])
  const [provider, setProvider] = useState<ProviderDataInterface | null>({
    Proveedor: '',
    Nombre: '',
    RFC: '',
    Telefonos: ''
  })
  const [origin, setOrigin] = useState<string | string[]>('')
  const [dataOrigin, setDataOrigin] = useState<LocationInterface[]>([])
  const [destination, setDestination] = useState<string | string[]>('')
  const [dataDestination, setDataDestination] = useState<LocationInterface[]>([])
  const [shipmentTime, setShipmentTime] = useState<string>('')
  const [arrivalTime, setArrivalTime] = useState<string>('')
  const [shipments, setShipments] = useState<ShipmentInterface[]>([])
  const [reload, setReload] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<number>(0)
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentInterface | null>(null)
  const { toast } = useToast()
  const [showFinishButton, setShowFinishButton] = useState(true)

  const printAgent = (agentID: string): string => {
    const agentName = agents.find(agent => agentID === agent.value)
    if (agentName != null) {
      return agentName.label
    }
    return agentID
  }

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

  const executeToast = (): void => {
    toast({
      variant: 'default',
      title: 'Registro Exitoso',
      description: 'Se ha registrado la solicitud de embarque'
    })
  }

  const handleSubmit = async (): Promise<void> => {
    const newShipment = {
      purchase: purchaseSelected,
      agent: agentSelected,
      provider: providerSelected,
      origin,
      destination,
      shipmentTime,
      arrivalTime,
      comments
    }

    console.log(newShipment)

    setLoading(true)

    try {
      const response = await axios.post(`${API}${SHIPMENTS}`, newShipment)
      if (response.status === 201) {
        executeToast()

        setPurchaseSelected([])
        setAgentSelected('')
        setProviderSelected('')
        setOrigin('')
        setDestination('')
        setShipmentTime('')
        setArrivalTime('')
        setDataOrigin([])
        setDataDestination([])
        setDetails([])
        setComments('')
        setReload(true)
      }
    } catch (error) {
      console.error('Error al registrar el envío:', error)
      // Puedes agregar aquí alguna lógica para mostrar un mensaje de error al usuario
    } finally {
      setLoading(false)
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

  const getProviders = async (): Promise<void> => {
    const res = await axios.get(`${API}${PROVIDERS}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  const getShipments = async (): Promise<ResponseShipments | null> => {
    const res = await axios.get(`${API}${SHIPMENTS}${ALL}`)
    return res.status === 200 ? res.data : null
  }

  const getDetailsbyShipment = async (id: number): Promise<ResponseShipmentDetails | null> => {
    const res = await axios.get(`${API}${PURCHASES}${SHIPMENTS}/${id}`)
    return res.status === 200 ? res.data : null
  }

  const refactorPurchases = (data: PurchaseInterface[] | undefined): OptionInterface[] => {
    if (data !== undefined) {
      return data.map(item => ({
        label: item.MovID,
        value: item.ID.toString()
      }))
    }
    return []
  }

  interface Event {
    title?: string
    time?: string
    description?: string
    typeEvent?: string
    color?: string
  }

  const staticEvents: Event[] = [
    { title: 'Embarque creado', time: '08:00 AM', description: 'El embarque ha sido creado', typeEvent: 'normal', color: 'bg-blue-600' },
    { title: 'Transportista asignado', time: '10:00 AM', description: 'Se ha asignado un transportista', typeEvent: 'normal', color: 'bg-blue-600' },
    { title: 'Salida a tránsito', time: '12:00 PM', description: 'El embarque ha salido a tránsito', typeEvent: 'critical', color: 'bg-yellow-600' }
  ]

  // Estados para eventos y control de botones
  const [events, setEvents] = useState(staticEvents.slice(0, 1))
  const [showAdvanceButton, setShowAdvanceButton] = useState(true) // Definir el estado para el botón de avanzar
  const [showExtraEventButton, setShowExtraEventButton] = useState(false)

  // Función para avanzar al siguiente evento estático
  const handleAdvanceEvent = (): void => {
    const nextIndex = events.length
    if (nextIndex < staticEvents.length) {
      setEvents(staticEvents.slice(0, nextIndex + 1))
    }
    if (nextIndex + 1 === staticEvents.length) {
      setShowExtraEventButton(true) // Mostrar botón para agregar eventos extraordinarios
      setShowAdvanceButton(false) // Ocultar botón de avanzar cuando se llega a "Salida a tránsito"
    }
  }

  // Función para agregar un evento extraordinario
  const handleAddExtraEvent = (eventTitle: string, comment: string): void => {
    const newEvent = { title: eventTitle, time: '02:00 PM', description: comment, TypeEvent: 'extraordinary', color: 'bg-red-600' }
    setEvents([...events, newEvent])
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

  const handleFinishJourney = (): void => {
    // Agregar un evento final de finalización
    const finalEvent = {
      title: 'Viaje Finalizado',
      time: new Date().toLocaleTimeString(),
      description: 'El viaje ha sido finalizado.',
      color: 'bg-green-600' // Color verde para el evento final
    }

    // Actualizar el estado de los eventos
    setEvents(prevEvents => [...prevEvents, finalEvent])

    setShowExtraEventButton(false)

    setShowFinishButton(false)
  }

  const refactorProviders = (data: any[]): OptionInterface[] => {
    return data.map(item => ({
      label: `${item.Proveedor as string} - ${item.Nombre as string}`,
      value: item.Proveedor
    }))
  }

  const refactorLocations = (data: LocationInterface[]): OptionInterface[] => {
    return data.map(item => ({
      label: `${item.location} - ${item.code}`,
      value: item.id.toString()
    }))
  }

  const showButton = (): boolean => {
    return purchaseSelected.length > 0 && agentSelected !== '' && providerSelected !== '' && origin !== '' && destination !== '' && shipmentTime !== '' && arrivalTime !== ''
  }

  const handleTarimasChange = (index: number, value: number): void => {
    const newDetails = [...details]
    newDetails[index].Cantidad = Number(value) * newDetails[index].Article.UnidadCantidad
    setDetails(newDetails) // Asegúrate de tener un estado para los detalles
  }

  const handleFieldChange = (id: number, field: string, value: string) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id === id ? { ...shipment, [field]: value } : shipment
      )
    )
  }

  const handleUpdateShipment = (id: number) => {
    // Aquí puedes agregar la lógica para guardar el embarque actualizado, por ejemplo, hacer una solicitud a la API.
    console.log('Actualizar embarque con ID', id)
  }

  // const events = [
  //   { title: 'Pedido Confirmado', time: '2024-08-01 08:00', description: 'El pedido fue confirmado.', type: 'normal' },
  //   { title: 'En Preparación', time: '2024-08-02 09:30', description: 'El pedido está en preparación.', type: 'normal' },
  //   { title: 'En Camino', time: '2024-08-03 14:45', description: 'El pedido ha salido del almacén.', type: 'warning' },
  //   { title: 'Retraso', time: '2024-08-04 16:15', description: 'Hubo un retraso en la entrega.', type: 'critical' }
  // ]

  // Último evento (el evento crítico o final)
  // const lastEvent = {
  //   title: 'Entrega Estimada',
  //   time: '2024-08-05 10:00',
  //   description: 'El pedido llegará a su destino.',
  //   type: 'normal'
  // }

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
      .then((data) => {
        if (Array.isArray(data?.agents)) {
          setAgents(refactorAgents(data.agents)) // Solo necesitas setAgents
        } else {
          console.log('No agents found or data format is incorrect.')
        }
      })
      .catch(() => {
        console.log('Error getting agents')
      })
  }, [])

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

  useEffect(() => {
    if (providerSelected !== '') {
      const provider = dataProviders?.find(item => item.Proveedor === providerSelected)
      setProvider(provider as ProviderDataInterface)
    }
  }, [providerSelected])

  useEffect(() => {
    if (selectedShipment > 0) {
      const provider = dataProviders?.find(item => item.Proveedor === shipmentDetails?.provider)
      setProvider(provider as ProviderDataInterface)
    }

    const origin = dataLocation.find(item => item.id === shipmentDetails?.origin)
    const destination = dataLocation.find(item => item.id === shipmentDetails?.destination)

    if (origin != null) { setDataOrigin([origin]) }
    if (destination != null) { setDataDestination([destination]) }

    if (shipmentDetails !== null && shipmentDetails?.id > 0) {
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
              <CardTitle>Asignación de transporte</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Distribución en tres columnas */}
              <div className='grid grid-cols-3 gap-4 mb-4'>
                {/* Primera columna: ID Embarque, Origen y Destino */}
                <div>
                  {/* ID Embarque */}
                  <div className='flex items-center mb-4'>
                    <Combobox
                      placeholder='ID Embarque'
                      mode='multiple'
                      options={purchases as ComboboxOptions[]}
                      selected={purchaseSelected}
                      onChange={(value) => setPurchaseSelected(value)}
                      className='w-full'
                    />
                    {purchaseSelected.length > 0 && (
                      <Button
                        size='icon'
                        className='ml-2'
                        onClick={() => {
                          setPurchaseSelected([])
                          setDetails([])
                        }}
                      >
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
                    {origin !== '' && (
                      <Button
                        size='icon'
                        className='ml-2'
                        onClick={() => {
                          setOrigin('')
                          setDataOrigin([])
                        }}
                      >
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
                    {destination !== '' && (
                      <Button
                        size='icon'
                        className='ml-2'
                        onClick={() => {
                          setDestination('')
                          setDataDestination([])
                        }}
                      >
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Segunda columna: Transportista, Unidad y Fecha de Arrivo */}
                <div>
                  {/* Transportista */}
                  <div className='flex items-center mb-4'>
                    <Combobox
                      placeholder='Transportista'
                      mode='single'
                      options={providers as ComboboxOptions[]}
                      selected={providerSelected}
                      onChange={(value) => setProviderSelected(value)}
                      className='w-full'
                    />
                    {providerSelected !== '' && (
                      <Button
                        size='icon'
                        className='ml-2'
                        onClick={() => setProviderSelected('')}
                      >
                        <IconX className='w-3 h-3' />
                      </Button>
                    )}
                  </div>

                  {/* Unidad */}
                  <div className='mb-4'>
                    <Input
                      className='w-full p-2 border rounded'
                      placeholder='Unidad'
                      // onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <Input
                      type='datetime-local'
                      className='w-full'
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                    <Label className='w-full text-xs italic'>Fecha Estimada de Arrivo</Label>
                  </div>

                </div>

                {/* Tercera columna: Eventos y Comentarios */}
                <div className='flex flex-col'>
                  {/* Eventos */}
                  <div className='mb-2'>
                    <Label className='mb-2 text-xs italic'>Eventos</Label>
                    <Input
                      className='w-full p-2 border rounded'
                      placeholder='Eventos'
                      // onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>

                  {/* Comentarios */}
                  <div>
                    <Label className='mb-2 text-xs italic'>Comentarios</Label>
                    <Input
                      className='w-full h-24 p-2 border rounded'
                      placeholder='Comentarios'
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Botón Registrar */}
              {showButton() && (
                <Button
                  className='w-full'
                  onClick={async () => await handleSubmit()}
                  disabled={loading}
                >
                  Registrar Embarque
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
              {/* <Card x-chunk='dashboard-05-chunk-3'>
                <CardHeader className='text-center'>
                  <CardTitle className='text-2xl font-bold'>
                    Embarques en tránsito
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Table className='w-full table-auto'>
                    <TableHeader>
                      <TableRow className='text-center'>
                        <TableHead className='text-center'>ID Embarque</TableHead>
                        <TableHead className='text-center'>Orden de Compra</TableHead>
                        <TableHead className='text-center'>Estatus</TableHead>
                        <TableHead className='text-center'>Creación del Embarque</TableHead>
                        <TableHead className='text-center'>Fecha Estimada de llegada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        shipments.length > 0
                          ? shipments.map((shipment) => (
                            <TableRow
                              key={shipment.id}
                              onClick={() => {
                                handleShowShipmentDetails(shipment.id)
                                setSelectedShipment(shipment.id)
                              }}
                              className={shipment.id === selectedShipment ? 'bg-muted/50 border-primary border-2 cursor-pointer text-center' : 'cursor-pointer text-center'}
                            >
                              <TableCell>{shipment.id.toString().padStart(9, '0')}</TableCell>
                              <TableCell>OC 46587</TableCell>
                              <TableCell>EMBARQUE SOLICITADO</TableCell>
                              <TableCell>
                                {
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
                              <TableCell colSpan={5} className='text-center'>No hay Ordenes de Seguimiento</TableCell>
                            </TableRow>
                            )
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card> */}

              <Card x-chunk='dashboard-05-chunk-3'>
                <CardHeader className='text-center'>
                  <CardTitle className='text-2xl font-bold'>
                    Embarques en tránsito
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Table className='w-full table-auto'>
                    <TableHeader>
                      <TableRow className='text-center'>
                        <TableHead className='text-center'>ID Embarque</TableHead>
                        <TableHead className='text-center'>Orden de Compra</TableHead>
                        <TableHead className='text-center'>Estatus</TableHead>
                        <TableHead className='text-center'>Creación del Embarque</TableHead>
                        <TableHead className='text-center'>Fecha Estimada de llegada</TableHead>
                        <TableHead className='text-center'>Acciones</TableHead> {/* Nueva columna de acciones */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shipments.length > 0
                        ? shipments.map((shipment) => (
                          <TableRow
                            key={shipment.id}
                            onClick={() => {
                              handleShowShipmentDetails(shipment.id)
                              setSelectedShipment(shipment.id)
                            }}
                            className={
                  shipment.id === selectedShipment
                    ? 'bg-muted/50 border-primary border-2 cursor-pointer text-center'
                    : 'cursor-pointer text-center'
                }
                          >
                            <TableCell>{shipment.id.toString().padStart(9, '0')}</TableCell>
                            <TableCell>OC 46587</TableCell>
                            <TableCell>EMBARQUE SOLICITADO</TableCell>
                            <TableCell>
                              {DateTime.fromISO(shipment.shipmentDate)
                                .setZone('America/Mexico_City')
                                .setLocale('es-MX')
                                .toFormat('ff')}
                            </TableCell>
                            <TableCell>
                              {DateTime.fromISO(shipment.updatedAt)
                                .setZone('America/Mexico_City')
                                .setLocale('es-MX')
                                .toFormat('ff')}
                            </TableCell>
                            <TableCell className='text-center'>
                              {/* Nueva columna con el botón de editar */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>
                                    Editar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Editar Embarque</DialogTitle>
                                  </DialogHeader>
                                  {/* Aquí puedes agregar campos de edición para el embarque */}
                                  <div>
                                    <label>ID Embarque</label>
                                    <Input
                                      type='text'
                                      value={shipment.id}
                                      readOnly
                                      className='w-full p-2 mb-4 border rounded'
                                    />
                                  </div>
                                  <div>
                                    <label>Orden de Compra</label>
                                    <Input
                                      type='text'
                                      value={shipment.orderPurchase != null ? shipment.orderPurchase : ''}
                                      onChange={(e) =>
                                        handleFieldChange(shipment.id, 'orderPurchase', e.target.value)}
                                      className='w-full p-2 mb-4 border rounded'
                                    />
                                  </div>
                                  <div>
                                    <label>Estatus</label>
                                    <Input
                                      type='text'
                                      value={shipment.status != null ? shipment.status : ''}
                                      onChange={(e) =>
                                        handleFieldChange(shipment.id, 'status', e.target.value)}
                                      className='w-full p-2 mb-4 border rounded'
                                    />

                                  </div>
                                  {/* Otros campos de edición que sean relevantes */}
                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleUpdateShipment(shipment.id)}
                                    >
                                      Guardar
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>

                          </TableRow>
                        ))
                        : (
                          <TableRow>
                            <TableCell colSpan={6} className='text-center'>No hay Ordenes de Seguimiento</TableCell>
                          </TableRow>
                          )}
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
                    <div className='font-semibold'>Detalles</div>
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

                  <div className='flex flex-col items-center my-12'>
                    {/* Botón para avanzar entre los eventos estáticos */}
                    {showAdvanceButton && (
                      <Button
                        className='px-4 py-2 mb-4'
                        onClick={handleAdvanceEvent}
                        disabled={events.length >= staticEvents.length}
                      >
                        Avanzar Evento
                      </Button>
                    )}

                    <div className='relative w-full'>
                      {/* Línea horizontal punteada simulando carretera */}
                      <div className='absolute w-full h-2 border-t-2 border-gray-300 border-dashed rounded-full' />

                      {/* Iterar sobre los eventos y crear un DialogTrigger para cada uno */}
                      {events.map((event, index) => (
                        <Dialog key={index}>
                          <DialogTrigger asChild>
                            <div
                              className={`absolute w-4 h-4 -translate-y-1/2 rounded-full cursor-pointer ${event.color}`}
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

                      {/* Ícono del camión desde "Salida a tránsito" */}
                      {events.length > 2 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              className='absolute -translate-x-1/2 -translate-y-full cursor-pointer'
                              style={{ left: '97%' }}
                            >
                              <IconTruckDelivery className='w-8 h-8 text-WHITE-700' />
                            </div>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Timeline Completo</DialogTitle>
                            </DialogHeader>
                            <div className='flex flex-col gap-4'>
                              <Accordion type='single' collapsible className='w-full'>
                                {events.map((event, index) => (
                                  <AccordionItem key={index} value={`event-${index}`}>
                                    <AccordionTrigger>{event.title}</AccordionTrigger>
                                    <AccordionContent>
                                      <p className='text-sm text-gray-500'>{event.time}</p>
                                      <p>{event.description}</p>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          </DialogContent>
                        </Dialog>

                      )}
                    </div>

                    {/* Botón para agregar eventos extraordinarios */}
                    {showExtraEventButton && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='px-4 py-2 mt-8'>Agregar Evento Extraordinario</Button>
                        </DialogTrigger>
                        <DialogContent className='w-[70vw]'>
                          <DialogHeader>
                            <DialogTitle>Agregar Evento Extraordinario</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const eventTitle = e.currentTarget.eventTitle.value
                              const comment = e.currentTarget.comment.value
                              handleAddExtraEvent(eventTitle, comment)
                            }}
                          >
                            <div className='mb-4'>
                              <Label htmlFor='eventTitle' className='block text-sm font-medium text-gray-700'>
                                Evento
                              </Label>
                              <Select name='eventTitle'>
                                <SelectTrigger className='w-full border border-gray-300 rounded-md'>
                                  <SelectValue placeholder='Seleccione un evento' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value='Demora en aduana'>Demora en aduana</SelectItem>
                                    <SelectItem value='Cambio de ruta'>Cambio de ruta</SelectItem>
                                    <SelectItem value='Parada no planificada'>Parada no planificada</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className='mb-4'>
                              <Label htmlFor='comment' className='block text-sm font-medium text-gray-700'>Comentario</Label>
                              <Textarea id='comment' rows={4} required className='w-full border-gray-300 rounded-md' />
                            </div>
                            <Button type='submit' className='px-4 py-2 mt-4'>Crear Evento</Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                    )}

                    {/* Botón para finalizar el viaje */}
                    {events.length > staticEvents.length && showFinishButton && (
                      <Button
                        className='px-4 py-2 mt-4'
                        onClick={handleFinishJourney}
                      >
                        Finalizar Viaje
                      </Button>
                    )}
                  </div>

                  <Separator className='my-8' />

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

                  <div className='grid gap-3'>
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
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Unidad</dt>
                              <dd>
                                <a>U-256</a>
                              </dd>
                            </div>
                            <div className='flex items-center justify-between'>
                              <dt className='text-muted-foreground'>Placa</dt>
                              <dd>
                                <a>JX-258-75</a>
                              </dd>
                            </div>
                          </>
                          )
                        : (
                          <Skeleton className='w-full h-12' />
                          )}
                    </dl>
                  </div>

                  <Separator className='my-4' />

                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Comentarios</dt>
                    <dd>
                      <a>Prueba de comentarios de la asignación de transporte</a>
                    </dd>
                  </div>
                </CardContent>

                )
              : (
                <>
                  <CardContent className='p-6 text-sm'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>Detalle del embarque</div>
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
                                      onChange={(e) => handleTarimasChange(index, e.currentTarget.value as unknown as number)}
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
