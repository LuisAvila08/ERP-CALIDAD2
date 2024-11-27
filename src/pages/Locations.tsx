import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { API } from '../config/Constant'
import { Location } from '../interfaces/Locations'
import { DataTable } from '@/components/ui/data-table'
import columns from '@/components/Locations/Columns'
import useLocationStore from '@/stores/useLocationStore'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { LocationInterface } from '@/interfaces/Shipments'

const Locations = (): JSX.Element => {
  const [locations, setLocations] = useState<Location[]>([])
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [newLocation, setNewLocation] = useState<Location>({
    location: '',
    city: '',
    estate: '',
    code: '',
    name: '',
    identity: '',
    address: '',
    references: '',
    longitude: undefined,
    latitude: undefined,
    status: true,
    comments: ''
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [errors, setErrors] = useState<{ code?: string, identity?: string }>({})

  const locationID = useLocationStore((state) => state.locationID)

  const initialNewLocationState: Location = {
    location: '',
    city: '',
    estate: '',
    code: '',
    name: '',
    identity: '',
    address: '',
    references: '',
    longitude: undefined,
    latitude: undefined,
    status: true
  }

  const getLocations = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API}/locations/all`)
      if (res.status === 200 && res.data.locations) {
        setLocations(res.data.locations)
        filterLocations(res.data.locations, filterStatus)
      } else {
        console.error('Unexpected response format:', res.data)
        setLocations([])
        setFilteredLocations([])
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLocations([])
      setFilteredLocations([])
    }
  }

  const filterLocations = (locations: Location[], status: 'all' | 'active' | 'inactive'): void => {
    const filtered = locations.filter((location) => {
      if (status === 'all') return true
      if (status === 'active') return location.status === true
      if (status === 'inactive') return location.status === false

      return false
    })
    setFilteredLocations(filtered)
  }

  useEffect(() => {
    handleEditLocation(locationID)
  }, [locationID])

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    filterLocations(locations, filterStatus)
  }, [filterStatus, locations])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'code' && value.length > 3) return
    if (name === 'identity' && value.length > 13) return

    setNewLocation((prev) => ({
      ...prev,
      [name]: name === 'longitude' || name === 'latitude' ? Number(value) : value.toUpperCase()
    }))

    if (name === 'identity') {
      if (value.length < 12) {
        setErrors((prev) => ({ ...prev, identity: 'La identidad debe tener al menos 12 caracteres.' }))
      } else if (value.length > 13) {
        setErrors((prev) => ({ ...prev, identity: 'La identidad no debe tener más de 13 caracteres.' }))
      } else {
        setErrors((prev) => ({ ...prev, identity: undefined }))
      }
    }

    if (name === 'code' && value.length === 3) {
      setErrors((prev) => ({ ...prev, code: undefined }))
    }
  }

  const handleAddLocation = async () => {
    if (errors.code || errors.identity) {
      console.log('Errors:', errors)
      return
    }

    try {
      const gps = JSON.stringify({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude
      })

      const locationToAdd = {
        ...newLocation,
        gps,
        status: newLocation.status ? 1 : 0
      }

      const response = await axios.post(`${API}/locations/create`, locationToAdd)
      setLocations([...locations, response.data])
      setNewLocation(initialNewLocationState)
      setOpenDialog(false)
    } catch (error) {
      console.error('Error adding location:', error)
    }
  }

  const handleUpdateLocation = async () => {
    if (errors.code || errors.identity || editingIndex === null) {
      console.log('Errors:', errors)
      return
    }

    try {
      const gps = JSON.stringify({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude
      })

      const updatedLocation = {
        ...newLocation,
        gps,
        status: newLocation.status ? 1 : 0
      }

      const locationId = locations[editingIndex].id
      const response = await axios.put(`${API}/locations/${locationId}`, updatedLocation)

      const updatedLocations = [...locations]
      updatedLocations[editingIndex] = response.data
      setLocations(updatedLocations)
      setEditingIndex(null)
      setNewLocation(initialNewLocationState)
      setOpenDialog(false)
    } catch (error) {
      console.error('Error updating location:', error)
    }
  }

  /*
  const handleClear = (field: keyof Location) => {
    setNewLocation((prev) => ({
      ...prev,
      [field]: ''
    }))
  }
  */

  const handleEditLocation = (index: number) => {
    setEditingIndex(index)

    const location = locations.find(item => item.id === index)

    if (location != null) {
      setNewLocation(location)
    }

    if (index > 0) {
      setOpenDialog(true)
    }
  }

  const handleOpenDialog = (isEdit: boolean) => {
    if (!isEdit) {
      setNewLocation(initialNewLocationState)
      setEditingIndex(null)
    }
    setOpenDialog(true)
  }

  const handleStatusChange = (checked: boolean) => {
    setNewLocation((prev) => ({ ...prev, status: checked }))
  }

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewLocation((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    console.log(locations)
  }, [locations])

  return (
    <Layout>
      <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='grid items-start gap-4 auto-rows-max md:gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Ubicaciones</CardTitle>
              <CardDescription>
                A continuación, se muestra una lista de todas las ubicaciones registradas.
              </CardDescription>
            </CardHeader>
            <CardContent className='overflow-auto'>
              <div className='mb-4'>
                <CardTitle>Registros</CardTitle>
                <div className='flex gap-4 mt-2'>
                  <Select
                   // TODO: Explícame esto por favor, id tampoco es una prop valida
                    // id='filterStatus'
                    value={filterStatus}
                    onValueChange={(value: 'all' | 'active' | 'inactive') => setFilterStatus(value)}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Filtrar por estado' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Todos</SelectItem>
                      <SelectItem value='active'>Activos</SelectItem>
                      <SelectItem value='inactive'>Inactivos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DataTable data={filteredLocations as LocationInterface[]} columns={columns} />
            </CardContent>
            <CardFooter className='justify-end'>
              <Button
                onClick={() => {
                  getCurrentPosition()
                  handleOpenDialog(false)
                }}
              >
                Agregar Nueva Ubicación
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Editar Ubicación' : 'Agregar Nueva Ubicación'}</DialogTitle>
            <DialogDescription>
              Ingrese los detalles de la ubicación.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <Input
              placeholder='Ubicación'
              value={newLocation.location}
              onChange={(e) => handleInputChange(e)}
              name='location'
            />
            <Input
              placeholder='Ciudad'
              value={newLocation.city}
              onChange={(e) => handleInputChange(e)}
              name='city'
            />
            <Input
              placeholder='Estado'
              value={newLocation.estate}
              onChange={(e) => handleInputChange(e)}
              name='estate'
            />
            <Input
              placeholder='Código'
              value={newLocation.code}
              onChange={(e) => handleInputChange(e)}
              name='code'
              maxLength={3}
            />
            <Input
              placeholder='Identidad'
              value={newLocation.identity}
              onChange={(e) => handleInputChange(e)}
              name='identity'
              maxLength={13}
            />
            <Input
              placeholder='Dirección'
              value={newLocation.address}
              onChange={(e) => handleInputChange(e)}
              name='address'
            />
            <Input
              placeholder='Referencias'
              value={newLocation.references}
              onChange={(e) => handleInputChange(e)}
              name='references'
            />
            <div className='flex gap-4'>
              <Input
                placeholder='Latitud'
                value={newLocation.latitude !== undefined ? String(newLocation.latitude) : ''}
                onChange={(e) => handleInputChange(e)}
                name='latitude'
              />
              <Input
                placeholder='Longitud'
                value={newLocation.longitude !== undefined ? String(newLocation.longitude) : ''}
                onChange={(e) => handleInputChange(e)}
                name='longitude'
              />
            </div>
            <Switch
              checked={newLocation.status}
              onCheckedChange={handleStatusChange}
            >
              {newLocation.status === true ? 'Activo' : 'Inactivo'}
            </Switch>
          </div>
          <Button
            onClick={editingIndex !== null ? handleUpdateLocation : handleAddLocation}
          >
            {editingIndex !== null ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default Locations
