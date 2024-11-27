import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import axios from 'axios'
import {
  Dialog,
  DialogContent, DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { IconEdit, IconMessageCircle } from '@tabler/icons-react'
import { ALL, API, EVENTS_CATALOG } from '../config/Constant'
import { DataTable } from '@/components/ui/data-table'
import Combobox from '@/components/ui/Combobox'
import { Badge } from '../components/ui/badge'
import { createColumnHelper } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

const columnHelper = createColumnHelper()

const getIcon = (type: string): JSX.Element => {
  switch (type) {
    case 'Info':
      return (
        <Badge className={cn('bg-green-950', 'text-primary-foreground')}>
          <IconMessageCircle className='w-4 h-4 mr-2' />
          Informativo
        </Badge>
      )
    case 'Warning':
      return (
        <Badge className={cn('bg-yellow-700', 'text-primary-foreground')}>
          <IconMessageCircle className='w-4 h-4 mr-2' />
          Advertencia
        </Badge>
      )
    case 'Critical':
      return (
        <Badge className={cn('bg-destructive', 'text-primary-foreground')}>
          <IconMessageCircle className='w-4 h-4 mr-2' />
          Crítico
        </Badge>
      )
    default:
      return <Badge variant='outline'>No Identificado</Badge>
  }
}

const UnitsTable: React.FC = () => {
  const [events, setEvents] = useState<any[]>([])
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  const [newEvent, setNewEvent] = useState({ description: '', eventType: '', status: true, comments: '' })
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [errors, setErrors] = useState<{ description?: string }>({})
  const [typeEvent, setTypeEvent] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [isCommentDialogOpen, setCommentDialogOpen] = useState<boolean>(false)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('description', {
      header: 'Alias',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('eventType', {
      header: 'Tipo de Evento',
      cell: (info) => getIcon(info.getValue())
    }),
    columnHelper.accessor('actions', {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className='flex justify-center space-x-2'>
          <IconEdit className='w-5 h-5 cursor-pointer' onClick={() => openEditDialog(row.index, row.original)} />
          <IconMessageCircle className='w-5 h-5 cursor-pointer' onClick={() => handleCommentClick(row.original)} />
        </div>
      )
    })
  ]

  const getEventsType = async () => {
    try {
      const response = await axios.get(`${API}${EVENTS_CATALOG}${ALL}`)
      setEvents(response.data?.typeOfEvents || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    getEventsType()
  }, [])

  useEffect(() => {
    filterEventsByStatus()
  }, [events, statusFilter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, description: value ? undefined : 'Description is required' }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewEvent((prev) => ({ ...prev, status: checked }))
  }

  const handleSaveEvent = async () => {
    if (errors.description) return

    try {
      const eventPayload = {
        description: newEvent.description,
        eventType: newEvent.eventType,
        status: newEvent.status,
        comments: newEvent.comments
      }

      if (editingIndex !== null && selectedEvent?.id) {
        // Editando un evento existente
        const response = await axios.put(`${API}/events/update/${selectedEvent.id}`, eventPayload)
        setEvents((prev) => {
          const newEvents = [...prev]
          newEvents[editingIndex] = response.data
          return newEvents
        })
      } else {
        // Creando un nuevo evento
        const response = await axios.post(`${API}/events/create`, eventPayload)
        setEvents((prev) => [...prev, response.data])
      }

      setOpenDialog(false)
      setEditingIndex(null)
      setNewEvent({ description: '', eventType: '', status: true, comments: '' })
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const openCreateDialog = () => {
    setEditingIndex(null)
    setSelectedEvent(null)
    setNewEvent({ description: '', eventType: '', status: true, comments: '' })
    setOpenDialog(true)
  }

  const openEditDialog = (index: number, event: any) => {
    setEditingIndex(index) // Se guarda el índice del evento que se está editando
    setNewEvent({
      description: event.description || '',
      eventType: event.eventType || '',
      status: event.status || false,
      comments: event.comments || ''
    })
    setSelectedEvent(event) // Se guarda el evento seleccionado
    setOpenDialog(true) // Abre el diálogo de edición
  }

  const handleCommentClick = (event: any) => {
    setSelectedEvent(event)
    setCommentDialogOpen(true)
  }

  const handleComboboxChange = (value: string) => {
    setTypeEvent(value)
    setNewEvent((prev) => ({ ...prev, eventType: value }))
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as 'all' | 'active' | 'inactive')
  }

  const filterEventsByStatus = () => {
    if (statusFilter === 'all') {
      setFilteredEvents(events)
    } else {
      const status = statusFilter === 'active'
      setFilteredEvents(events.filter((event) => event.status === status))
    }
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
          <CardDescription>Lista de Eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <Combobox
              mode='single'
              placeholder='Filtrar por estado'
              selected={statusFilter}
              options={[
                { value: 'all', label: 'Todos' },
                { value: 'active', label: 'Activos' },
                { value: 'inactive', label: 'Inactivos' }
              ]}
              onChange={()=>{
                handleStatusFilterChange(statusFilter)
              }}
            />
          </div>
          <DataTable columns={columns} data={filteredEvents} />
        </CardContent>
        <CardFooter>
          <Button onClick={openCreateDialog}>Agregar Nuevo Evento</Button>
        </CardFooter>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Editar Evento' : 'Crear Nuevo Evento'}</DialogTitle>
          </DialogHeader>
          <Input
            name='description'
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder='Alias del evento'
            required
            // * Me gustaría saber que intentaste hacer aquí, ya que la propiedad error no existe
            // TODO: Revisar este error
            // error={errors.description as string}
          />
          <Combobox
            mode='single'
            placeholder='Tipo de Evento'
            selected={typeEvent}
            options={[
              { value: 'Info', label: 'Informativo' },
              { value: 'Warning', label: 'Advertencia' },
              { value: 'Critical', label: 'Crítico' }
            ]}
            onChange={() => {
              handleComboboxChange(typeEvent)
            }}
            className='w-64'
          />
          <div className='flex items-center my-4'>
            <Switch
              checked={newEvent.status}
              onCheckedChange={handleSwitchChange}
            >
              {newEvent.status ? 'Activo' : 'Inactivo'}
            </Switch>

          </div>
          <DialogFooter>
            <Button onClick={handleSaveEvent}>Guardar</Button>
            <Button variant='ghost' onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCommentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comentarios del Evento</DialogTitle>
          </DialogHeader>
          <p>{selectedEvent?.comments || 'No hay comentarios disponibles para este evento.'}</p>
          <DialogFooter>
            <Button onClick={() => setCommentDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default UnitsTable
