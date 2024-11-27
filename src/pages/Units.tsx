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
import Combobox from '@/components/ui/Combobox'
import { IconEdit } from '@tabler/icons-react'
import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from '@/components/ui/table'

const initialUnits = [
  { transporter: 'Transportista 1', model: 'Modelo A', unit: 'Unidad 1', plate: 'ABC123' },
  { transporter: 'Transportista 2', model: 'Modelo B', unit: 'Unidad 2', plate: 'XYZ789' }
]

const TransportUnitsTable: React.FC = () => {
  const [units, setUnits] = useState(initialUnits)
  const [filteredUnits, setFilteredUnits] = useState(initialUnits)
  const [newUnit, setNewUnit] = useState({ transporter: '', model: '', unit: '', plate: '' })
  const [editingUnit, setEditingUnit] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const [selectedTransporter, setSelectedTransporter] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUnit((prev) => ({ ...prev, [name]: value }))
  }

  const handleTransporterChange = (value: string) => {
    setSelectedTransporter(value)
    setFilteredUnits(units.filter(unit => unit.transporter === value))
  }

  const handleSaveUnit = () => {
    if (editingUnit) {
      setUnits((prev) => prev.map(unit => unit === editingUnit ? newUnit : unit))
      setFilteredUnits((prev) => prev.map(unit => unit === editingUnit ? newUnit : unit))
      setOpenEditDialog(false)
    } else {
      setUnits((prev) => [...prev, newUnit])
      setFilteredUnits((prev) => [...prev, newUnit])
      setOpenDialog(false)
    }
    setNewUnit({ transporter: '', model: '', unit: '', plate: '' })
    setEditingUnit(null)
  }

  const openCreateDialog = () => {
    setOpenDialog(true)
  }

  const handleEditDialogOpen = (unit: any) => {
    console.log('Editing unit:', unit) // Debugging line
    setEditingUnit(unit)
    setNewUnit(unit)
    setOpenEditDialog(true)
  }

  // ! Solo para eliminar el error, esto no debería ser usado
  React.useEffect(() => {
    console.log('units:', units)
  }, [])

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Unidades de Transporte</CardTitle>
          <CardDescription>Lista de Unidades de Transporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <div className='w-1/3'>
              <Combobox
                mode='single'
                placeholder='Filtrar por transportista'
                selected={selectedTransporter}
                options={[
                  { value: '', label: 'Todos' },
                  { value: 'Transportista 1', label: 'Transportista 1' },
                  { value: 'Transportista 2', label: 'Transportista 2' }
                ]}
                onChange={(e) => {
                  handleTransporterChange(e as string)
                }}
              />
            </div>
          </div>

          {/* Replace DataTable with a simple table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transportista</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit, index) => (
                <TableRow key={index}>
                  <TableCell>{unit.transporter}</TableCell>
                  <TableCell>{unit.model}</TableCell>
                  <TableCell>{unit.unit}</TableCell>
                  <TableCell>{unit.plate}</TableCell>
                  <TableCell>
                    <IconEdit
                      onClick={() => handleEditDialogOpen(unit)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={openCreateDialog}>Agregar Nueva Unidad</Button>
        </CardFooter>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Unidad</DialogTitle>
          </DialogHeader>
          <Input
            name='transporter'
            value={newUnit.transporter}
            onChange={handleInputChange}
            placeholder='Transportista'
          />
          <Input
            name='model'
            value={newUnit.model}
            onChange={handleInputChange}
            placeholder='Modelo'
          />
          <Input
            name='unit'
            value={newUnit.unit}
            onChange={handleInputChange}
            placeholder='Unidad'
          />
          <Input
            name='plate'
            value={newUnit.plate}
            onChange={handleInputChange}
            placeholder='Placa'
          />
          <DialogFooter>
            <Button onClick={handleSaveUnit}>Guardar</Button>
            <Button variant='ghost' onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Unidad</DialogTitle>
          </DialogHeader>
          <Input
            name='transporter'
            value={newUnit.transporter}
            onChange={handleInputChange}
            placeholder='Transportista'
          />
          <Input
            name='model'
            value={newUnit.model}
            onChange={handleInputChange}
            placeholder='Modelo'
          />
          <Input
            name='unit'
            value={newUnit.unit}
            onChange={handleInputChange}
            placeholder='Unidad'
          />
          <Input
            name='plate'
            value={newUnit.plate}
            onChange={handleInputChange}
            placeholder='Placa'
          />
          <DialogFooter>
            <Button onClick={handleSaveUnit}>Guardar</Button>
            <Button variant='ghost' onClick={() => setOpenEditDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default TransportUnitsTable
