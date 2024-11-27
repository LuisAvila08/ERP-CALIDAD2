// import { EventInterface } from '@/interfaces/Events'
// import { IconAlertCircleFilled, IconAlertSquareFilled, IconAlertTriangleFilled, IconEditCircle, IconMessageCircle, IconEdit } from '@tabler/icons-react'
// import { createColumnHelper } from '@tanstack/react-table'
// import { useState } from 'react'
// import useEventStore from '@/stores/useEventStore'
// import { Badge } from '../ui/badge'
// import { cn } from '@/lib/utils'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import Combobox from '@/components/Shipments/Combobox'
// import { Switch } from '@/components/ui/switch'
// import { Button } from '@/components/ui/button'

// const columnHelper = createColumnHelper<EventInterface>()

// const getIcon = (type: string): JSX.Element => {
//   switch (type) {
//     case 'Info':
//       return <Badge className={cn('bg-green-950', 'text-primary-foreground')}><IconAlertSquareFilled className='w-4 h-4 mr-2' />Informativo</Badge>
//     case 'Warning':
//       return <Badge className={cn('bg-yellow-700', 'text-primary-foreground')}><IconAlertTriangleFilled className='w-4 h-4 mr-2' />Advertencia</Badge>
//     case 'Critical':
//       return <Badge className={cn('bg-destructive', 'text-primary-foreground')}><IconAlertCircleFilled className='w-4 h-4 mr-2' />Crítico</Badge>
//     default:
//       return <Badge variant='outline'>No Identificado</Badge>
//   }
// }

// const EditRecordDialog = ({
//   event,
//   open,
//   onClose,
//   handleInputChange,
//   handleComboboxChange,
//   handleSwitchChange,
//   handleCreateEvent,
//   handleEditEvent,
//   newEvent,
//   editingIndex,
//   errors,
//   typeEvent
// }: {
//   event: EventInterface | null
//   open: boolean
//   onClose: () => void
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   handleComboboxChange: (value: string) => void
//   handleSwitchChange: (checked: boolean) => void
//   handleCreateEvent: () => void
//   handleEditEvent: () => void
//   newEvent: any // tipo puede ajustarse según la estructura del evento
//   editingIndex: number | null
//   errors: any // tipo puede ajustarse según la estructura de errores
//   typeEvent: string
// }) => {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{editingIndex !== null ? 'Editar Evento' : 'Crear Nuevo Evento'}</DialogTitle>
//           <DialogDescription>
//             Rellena el formulario para {editingIndex !== null ? 'editar' : 'crear'} un evento.
//           </DialogDescription>
//         </DialogHeader>
//         <Input
//           name='description'
//           value={newEvent.description}
//           onChange={handleInputChange}
//           placeholder='Descripción del Evento'
//         />
//         {errors.description && <p className='text-red-500'>{errors.description}</p>}
//         <Combobox
//           mode='single'
//           placeholder='Tipo de Evento'
//           selected={typeEvent}
//           options={[
//             { value: 'Info', label: 'Informativo' },
//             { value: 'Warning', label: 'Advertencia' },
//             { value: 'Critical', label: 'Crítico' }
//           ]}
//           onChange={handleComboboxChange}
//         />
//         <Switch checked={newEvent.status} onCheckedChange={handleSwitchChange}>Estado</Switch>
//         <DialogFooter>
//           <Button onClick={editingIndex !== null ? handleEditEvent : handleCreateEvent}>
//             {editingIndex !== null ? 'Guardar Cambios' : 'Crear Evento'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// const columns = [
//   columnHelper.accessor('id', {
//     header: 'ID',
//     cell: (info) => info.getValue()
//   }),
//   columnHelper.accessor('description', {
//     header: 'Alias',
//     cell: (info) => info.getValue()
//   }),
//   columnHelper.accessor('eventType', {
//     header: 'Tipo de Evento',
//     cell: (info) => {
//       return getIcon(info.getValue())
//     }
//   }),
//   columnHelper.accessor('createdAt', {
//     header: 'Estatus',
//     cell: (_info) => <Badge variant='secondary'>Activo</Badge>
//   }),
//   columnHelper.accessor('actions', {
//     header: 'Acciones',
//     cell: ({ row }) => {
//       const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null)
//       const [isEditRecordDialogOpen, setEditRecordDialogOpen] = useState(false)
//       const [newEvent, setNewEvent] = useState({ description: '', status: false })
//       const [typeEvent, setTypeEvent] = useState('Info')
//       const [editingIndex, setEditingIndex] = useState<number | null>(null)
//       const [errors, setErrors] = useState<any>({})

//       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setNewEvent((prev: any) => ({ ...prev, [name]: value }))
//       }

//       const handleComboboxChange = (value: string) => {
//         setTypeEvent(value)
//       }

//       const handleSwitchChange = (checked: boolean) => {
//         setNewEvent((prev: any) => ({ ...prev, status: checked }))
//       }

//       const handleCreateEvent = () => {
//         // Lógica para crear el evento
//       }

//       const handleEditEvent = () => {
//         // Lógica para editar el evento
//       }

//       const handleCommentClick = () => {
//         // Lógica para abrir el dialog o modal de comentarios
//       }

//       return (
//         <div className='flex justify-center space-x-2'>
//           {/* Botón para editar el registro completo */}
//           <EditRecordDialog
//             event={selectedEvent}
//             open={isEditRecordDialogOpen}
//             onClose={() => setEditRecordDialogOpen(false)}
//             handleInputChange={handleInputChange}
//             handleComboboxChange={handleComboboxChange}
//             handleSwitchChange={handleSwitchChange}
//             handleCreateEvent={handleCreateEvent}
//             handleEditEvent={handleEditEvent}
//             newEvent={newEvent}
//             editingIndex={editingIndex}
//             errors={errors}
//             typeEvent={typeEvent}
//           />
//           <IconEdit
//             className='w-5 h-5 cursor-pointer'
//             onClick={() => {
//               setSelectedEvent(row.original)
//               setNewEvent({ description: row.original.description, status: row.original.status })
//               setTypeEvent(row.original.eventType)
//               setEditingIndex(row.index)
//               setEditRecordDialogOpen(true)
//             }}
//           />
//           {/* Botón para comentarios */}
//           <IconMessageCircle
//             className='w-5 h-5 cursor-pointer'
//             onClick={handleCommentClick}
//           />
//         </div>
//       )
//     }
//   })
// ]

// export default columns
