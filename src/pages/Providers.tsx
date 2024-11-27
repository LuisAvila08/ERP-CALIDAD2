import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Combobox from '@/components/ui/Combobox'
import { IconEdit } from '@tabler/icons-react'

const initialProviders = [
  {
    provider: 'Proveedor 1',
    contact: 'Juan Pérez',
    phone: '555-1234',
    email: 'juan@example.com',
    address: 'Calle Falsa 123',
    rfc: 'XEXX010101000',
    additionalPhone: '555-9876'
  },
  {
    provider: 'Proveedor 2',
    contact: 'Ana Gómez',
    phone: '555-5678',
    email: 'ana@example.com',
    address: 'Avenida Siempre Viva 742',
    rfc: 'ABC123456789',
    additionalPhone: '555-6789'
  }
]

const TransportProvidersTable: React.FC = () => {
  const [providers, setProviders] = useState(initialProviders)
  const [filteredProviders, setFilteredProviders] = useState(initialProviders)
  const [newProvider, setNewProvider] = useState({ provider: '', contact: '', phone: '', email: '', address: '', rfc: '', additionalPhone: '' })
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  // const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  // const [selectedProviderDetail, setSelectedProviderDetail] = useState<any>(null)
  const [editProvider, setEditProvider] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProvider((prev) => ({ ...prev, [name]: value }))
  }

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value)
    setFilteredProviders(providers.filter(provider => provider.provider === value || value === ''))
  }

  const handleSaveProvider = () => {
    setProviders((prev) => [...prev, newProvider])
    setFilteredProviders((prev) => [...prev, newProvider])
    setOpenDialog(false)
    setNewProvider({ provider: '', contact: '', phone: '', email: '', address: '', rfc: '', additionalPhone: '' })
  }

  /*
  const handleRowClick = (provider: any) => {
    setSelectedProviderDetail(provider)
    setOpenDetailDialog(true)
  }
    */

  const openCreateDialog = () => {
    setOpenDialog(true)
  }

  const handleEditClick = (provider: any) => {
    setEditProvider(provider)
    setOpenEditDialog(true)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditProvider((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSaveEdit = () => {
    setProviders((prev) =>
      prev.map((p) => (p.provider === editProvider.provider ? editProvider : p))
    )
    setOpenEditDialog(false)
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Proveedores de Transporte</CardTitle>
          <CardDescription>Lista de proveedores de transporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-start mb-4'>
            <div className='w-1/3'>
              <Combobox
                mode='single'
                placeholder='Filtrar por proveedor'
                selected={selectedProvider}
                options={[
                  { value: '', label: 'Todos' },
                  { value: 'Proveedor 1', label: 'Proveedor 1' },
                  { value: 'Proveedor 2', label: 'Proveedor 2' }
                ]}
                onChange={() => {
                  handleProviderChange(selectedProvider)
                }}
              />
            </div>
          </div>

          <Table>
            <TableCaption>Lista de proveedores recientes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[150px]'>Proveedor</TableHead>
                <TableHead className='w-[150px]'>Contacto</TableHead>
                <TableHead className='w-[120px]'>Teléfono</TableHead>
                <TableHead className='w-[150px]'>Correo Electrónico</TableHead>
                <TableHead className='w-[150px]'>Dirección</TableHead>
                <TableHead className='w-[150px]'>RFC</TableHead>
                <TableHead className='w-[150px]'>Teléfono Adicional</TableHead>
                <TableHead className='w-[100px]'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider, index) => (
                <TableRow
                  key={index} onClick={() => {
                    // handleRowClick(provider)
                  }}
                >
                  <TableCell className='font-medium'>{provider.provider}</TableCell>
                  <TableCell>{provider.contact}</TableCell>
                  <TableCell>{provider.phone}</TableCell>
                  <TableCell>{provider.email}</TableCell>
                  <TableCell>{provider.address}</TableCell>
                  <TableCell>{provider.rfc}</TableCell>
                  <TableCell>{provider.additionalPhone}</TableCell>
                  <TableCell className='text-center'>
                    <Button
                      variant='ghost'
                      onClick={(e) => { e.stopPropagation(); handleEditClick(provider) }}
                      className='flex items-center justify-center w-full h-full'
                    >
                      <IconEdit className='w-5 h-5' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={openCreateDialog}>Agregar Nuevo Proveedor</Button>
        </CardFooter>
      </Card>

      {/* Diálogo para crear un nuevo proveedor */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proveedor</DialogTitle>
          </DialogHeader>
          <Input
            name='provider'
            value={newProvider.provider}
            onChange={handleInputChange}
            placeholder='Proveedor'
          />
          <Input
            name='contact'
            value={newProvider.contact}
            onChange={handleInputChange}
            placeholder='Contacto'
          />
          <Input
            name='phone'
            value={newProvider.phone}
            onChange={handleInputChange}
            placeholder='Teléfono'
          />
          <Input
            name='email'
            value={newProvider.email}
            onChange={handleInputChange}
            placeholder='Correo Electrónico'
          />
          <Input
            name='address'
            value={newProvider.address}
            onChange={handleInputChange}
            placeholder='Dirección'
          />
          <Input
            name='rfc'
            value={newProvider.rfc}
            onChange={handleInputChange}
            placeholder='RFC'
          />
          <Input
            name='additionalPhone'
            value={newProvider.additionalPhone}
            onChange={handleInputChange}
            placeholder='Teléfono Adicional'
          />
          <DialogFooter>
            <Button onClick={handleSaveProvider}>Guardar</Button>
            <Button variant='ghost' onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar proveedor */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
          </DialogHeader>
          {editProvider && (
            <>
              <Input
                name='provider'
                value={editProvider.provider}
                onChange={handleEditInputChange}
                placeholder='Proveedor'
              />
              <Input
                name='contact'
                value={editProvider.contact}
                onChange={handleEditInputChange}
                placeholder='Contacto'
              />
              <Input
                name='phone'
                value={editProvider.phone}
                onChange={handleEditInputChange}
                placeholder='Teléfono'
              />
              <Input
                name='email'
                value={editProvider.email}
                onChange={handleEditInputChange}
                placeholder='Correo Electrónico'
              />
              <Input
                name='address'
                value={editProvider.address}
                onChange={handleEditInputChange}
                placeholder='Dirección'
              />
              <Input
                name='rfc'
                value={editProvider.rfc}
                onChange={handleEditInputChange}
                placeholder='RFC'
              />
              <Input
                name='additionalPhone'
                value={editProvider.additionalPhone}
                onChange={handleEditInputChange}
                placeholder='Teléfono Adicional'
              />
              <DialogFooter>
                <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
                <Button variant='ghost' onClick={() => setOpenEditDialog(false)}>
                  Cancelar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar detalles del proveedor */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proveedor</DialogTitle>
          </DialogHeader>
          <div className='space-y-3'>
            <Input name='provider' value={newProvider.provider} onChange={handleInputChange} placeholder='Proveedor' className='w-full' />
            <Input name='contact' value={newProvider.contact} onChange={handleInputChange} placeholder='Contacto' className='w-full' />
            <Input name='phone' value={newProvider.phone} onChange={handleInputChange} placeholder='Teléfono' className='w-full' />
            <Input name='email' value={newProvider.email} onChange={handleInputChange} placeholder='Correo Electrónico' className='w-full' />
            <Input name='address' value={newProvider.address} onChange={handleInputChange} placeholder='Dirección' className='w-full' />
            <Input name='rfc' value={newProvider.rfc} onChange={handleInputChange} placeholder='RFC' className='w-full' />
            <Input name='additionalPhone' value={newProvider.additionalPhone} onChange={handleInputChange} placeholder='Teléfono Adicional' className='w-full' />
          </div>
          <DialogFooter className='mt-4 space-x-4'>
            <Button onClick={handleSaveProvider}>Guardar</Button>
            <Button variant='ghost' onClick={() => setOpenDialog(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default TransportProvidersTable
