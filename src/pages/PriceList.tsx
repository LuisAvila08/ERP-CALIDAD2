import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { API, LOT_SERIES, SPECIES, ALL, ARTICLE, SIZES, VARIETIES, LABELS, PRICES, QUALITY, PACKAGING, PRESENTATIONS } from '@/config/Constant'
import PriceListDetailsInterface, { PriceNewInterface } from '@/interfaces/PriceListDetails'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PriceListTable from '@/components/PriceList/PriceListTable'
import { usePriceListStore } from '@/stores/PriceListStore'
import { useCheckedStore } from '@/stores/CheckedStore'
import PriceListLoading from '@/components/PriceList/PriceListLoading'
import Disconnected from '@/components/Disconnected'
import Combobox from '@/components/PriceList/Combobox'
import { IconFilterX, IconSquareXFilled } from '@tabler/icons-react'
import { ResponseSizes, ResponseSpecies, ResponseVarieties, ResponseLabels, OptionInterface, ResponseQuality, ResponsePackaging, ResponsePresentations } from '@/interfaces/Article'
import { useFilterValue } from '@/stores/FilterValue'
import { Button } from '@/components/ui/button'
import { loggedUserInterface } from '@/interfaces/User'
import { Input } from '@/components/ui/input'

const PricesContent = (): JSX.Element => {
  const [priceListDetails, setPriceListDetails] = useState<PriceListDetailsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [disconnected, setDisconnected] = useState(false)

  const [specieSelected, setSpecieSelected] = useState<string | string[]>('')
  const [species, setSpecies] = useState<OptionInterface[]>([])

  const [sizeSelected, setSizeSelected] = useState<string | string[]>('')
  const [sizes, setSizes] = useState<OptionInterface[]>([])

  const [varietySelected, setVarietySelected] = useState<string | string[]>('')
  const [variety, setVariety] = useState<OptionInterface[]>([])

  const [labelSelected, setLabelSelected] = useState<string | string[]>('')
  const [label, setLabel] = useState<OptionInterface[]>([])

  const [qualitySelected, setQualitySelected] = useState<string | string[]>('')
  const [quality, setQuality] = useState<OptionInterface[]>([])

  const [packagingSelected, setPackagingSelected] = useState<string | string[]>('')
  const [packaging, setPackaging] = useState<OptionInterface[]>([])

  const [presentationsSelected, setPresentationsSelected] = useState<string | string[]>('')
  const [presentations, setPresentations] = useState<OptionInterface[]>([])

  const reload = usePriceListStore((state: { reloadList: number }) => state.reloadList)
  const [filter] = useFilterValue((state) => [state.value])

  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState(query)

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

  const clearFilters = (): void => {
    if (specieSelected !== '' || sizeSelected !== '' || varietySelected !== '' || labelSelected !== '' || qualitySelected !== '' || packagingSelected !== '' || presentationsSelected !== '') {
      setSpecieSelected('')
      setSizeSelected('')
      setVarietySelected('')
      setLabelSelected('')
      setQualitySelected('')
      setPackagingSelected('')
      setPresentationsSelected('')
      setLoading(true)
    }
  }

  const updateChecked = (data: PriceListDetailsInterface[]): void => {
    const actualChecked = useCheckedStore.getState().checked

    if (actualChecked.length > 0) {
      const newData = data.map((item) => {
        const index = actualChecked.findIndex((checkedItem) => checkedItem.Articulo === item.Articulo)

        return {
          Articulo: item.Articulo,
          checked: index > -1 ? actualChecked[index].checked : true
        }
      })
      useCheckedStore.setState({ checked: newData })
    } else {
      const newData = data.map((item) => {
        return {
          Articulo: item.Articulo,
          checked: true
        }
      })
      useCheckedStore.setState({ checked: newData })
    }
  }

  const getSpecies = async (): Promise<ResponseSpecies | null> => {
    const res = await axios.get(`${API}${ARTICLE}${SPECIES}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        packaging: packagingSelected,
        size: sizeSelected,
        quality: qualitySelected,
        label: labelSelected,
        variety: varietySelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getVariety = async (): Promise<ResponseVarieties | null> => {
    const res = await axios.get(`${API}${ARTICLE}${VARIETIES}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        packaging: packagingSelected,
        size: sizeSelected,
        quality: qualitySelected,
        label: labelSelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getLabels = async (): Promise<ResponseLabels | null> => {
    const res = await axios.get(`${API}${ARTICLE}${LABELS}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        packaging: packagingSelected,
        size: sizeSelected,
        quality: qualitySelected,
        variety: varietySelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getSizes = async (): Promise<ResponseSizes | null> => {
    const res = await axios.get(`${API}${ARTICLE}${SIZES}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        packaging: packagingSelected,
        quality: qualitySelected,
        label: labelSelected,
        variety: varietySelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getQualities = async (): Promise<ResponseQuality | null> => {
    const res = await axios.get(`${API}${ARTICLE}${QUALITY}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        packaging: packagingSelected,
        size: sizeSelected,
        label: labelSelected,
        variety: varietySelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getPackaging = async (): Promise<ResponsePackaging | null> => {
    const res = await axios.get(`${API}${ARTICLE}${PACKAGING}${ALL}`, {
      params: {
        presentation: presentationsSelected,
        size: sizeSelected,
        quality: qualitySelected,
        label: labelSelected,
        variety: varietySelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getPresentations = async (): Promise<ResponsePresentations | null> => {
    const res = await axios.get(`${API}${ARTICLE}${PRESENTATIONS}${ALL}`, {
      params: {
        packaging: packagingSelected,
        size: sizeSelected,
        quality: qualitySelected,
        label: labelSelected,
        variety: varietySelected,
        specie: specieSelected
      }
    })
    return res.status === 200 ? res.data : null
  }

  const getPriceListDetails = async (query: string): Promise<PriceListDetailsInterface[] | null> => {
    const res = await axios.get(`${API}${LOT_SERIES}${PRICES}`, {
      params: {
        species: specieSelected,
        size: sizeSelected,
        variety: varietySelected,
        label: labelSelected,
        quality: qualitySelected,
        packaging: packagingSelected,
        presentation: presentationsSelected,
        location: user.location,
        query
      }
    })
    return (res.status === 200) ? res.data : null
  }

  const releaseSpecies = (): void => {
    setLoading(true)
    setSpecieSelected('')
  }

  const releaseSize = (): void => {
    setLoading(true)
    setSizeSelected('')
  }

  const releaseVariety = (): void => {
    setLoading(true)
    setVarietySelected('')
  }

  const releaseLabel = (): void => {
    setLoading(true)
    setLabelSelected('')
  }

  const releaseQuality = (): void => {
    setLoading(true)
    setQualitySelected('')
  }

  const releasePackaging = (): void => {
    setLoading(true)
    setPackagingSelected('')
  }

  const releasePresentations = (): void => {
    setLoading(true)
    setPresentationsSelected('')
  }

  // Especies
  useEffect(() => {
    getSpecies()
      .then((res) => {
        if (res != null) {
          let newOptions = res.species.map((specie) => {
            if (specie.NombreCorto !== null) {
              return {
                value: specie.NombreCorto,
                label: specie.NombreCorto
              }
            } else {
              return null
            }
          })

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setSpecies(newOptions as OptionInterface[])
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, packagingSelected, qualitySelected, labelSelected, varietySelected, sizeSelected])

  // Variedad

  useEffect(() => {
    getVariety()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.varieties
            .filter(variety => variety.Familia !== null)
            .map(variety => ({ value: variety.Familia, label: variety.Familia }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setVariety(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, packagingSelected, qualitySelected, labelSelected, sizeSelected, specieSelected])

  // Etiqueta

  useEffect(() => {
    getLabels()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.labels
            .filter(label => label.Fabricante !== null)
            .map(label => ({ value: label.Fabricante, label: label.Fabricante }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setLabel(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, packagingSelected, qualitySelected, varietySelected, sizeSelected, specieSelected])

  // Calidad
  useEffect(() => {
    getQualities()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.qualities
            .filter(quality => quality.Calidad !== null)
            .map(quality => ({ value: quality.Calidad, label: quality.Calidad }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setQuality(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, packagingSelected, labelSelected, varietySelected, sizeSelected, specieSelected])

  // Calibre
  useEffect(() => {
    getSizes()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.sizes
            .filter(size => size.Grupo !== null)
            .map(size => ({ value: size.Grupo, label: size.Grupo }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setSizes(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, packagingSelected, labelSelected, varietySelected, qualitySelected, specieSelected])

  // Tipo Empaque
  useEffect(() => {
    getPackaging()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.packaging
            .filter(packaging => packaging.TipoEmpaque !== null)
            .map(packaging => ({ value: packaging.TipoEmpaque, label: packaging.TipoEmpaque }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setPackaging(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [presentationsSelected, labelSelected, varietySelected, qualitySelected, sizeSelected, specieSelected])

  // Presentación
  useEffect(() => {
    getPresentations()
      .then((res) => {
        if (res != null) {
          let newOptions: OptionInterface[] = res.presentations
            .filter(presentation => presentation.Presentacion !== null)
            .map(presentation => ({ value: presentation.Presentacion, label: presentation.Presentacion }))

          newOptions = newOptions.filter(function (element) {
            return element !== undefined
          })

          setPresentations(newOptions)
        }
      })
      .catch((error) => console.log(error))
  }, [packagingSelected, labelSelected, varietySelected, qualitySelected, sizeSelected, specieSelected])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  // Lista de Precios
  useEffect(() => {
    if (user !== undefined && user.username !== 'E-00000') {
      setLoading(true)
      getPriceListDetails(debouncedQuery).then((res) => {
        if (res != null) {
          setLoading(false)
          setPriceListDetails(res)
        }
      }).catch((error) => {
        console.log(error)
        setDisconnected(true)
      })
    }
  }, [reload, specieSelected, sizeSelected, varietySelected, labelSelected, qualitySelected, packagingSelected, presentationsSelected, user, debouncedQuery])

  useEffect(() => {
    if (priceListDetails.length > 0) {
      if (filter.trim() !== '') {
        updateChecked(
          priceListDetails.filter((element: PriceNewInterface) =>
            (element.Descripción?.toLowerCase().includes(filter.toLowerCase()) ||
            element.Articulo?.toLowerCase().includes(filter.toLowerCase()))
          )
        )
      } else {
        updateChecked(priceListDetails)
      }
    } else {
      useCheckedStore.setState({ checked: [] })
    }
  }, [priceListDetails, filter])

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setQuery(value)
  }

  return (
    <main className='grid items-start gap-4 p-4 sm:px-6 sm:py-0'>
      <div className='grid items-start gap-4'>
        <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
          <CardHeader className='pb-0' />
          <CardContent>
            <div className='grid grid-cols-8 gap-2 mb-0 md:mb-4 lg:grid-cols-8 lg:gap-4'>
              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={species}
                  placeholder='Especie'
                  selected={specieSelected}
                  onChange={(value) => {
                    setLoading(true)
                    setSpecieSelected(value)
                  }}
                />
                {specieSelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releaseSpecies} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={variety}
                  placeholder='Variedad'
                  selected={varietySelected}
                  onChange={(value) => {
                    setLoading(true)
                    setVarietySelected(value)
                  }}
                />
                {varietySelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releaseVariety} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={label}
                  placeholder='Etiqueta'
                  selected={labelSelected}
                  onChange={(value) => {
                    setLoading(true)
                    setLabelSelected(value)
                  }}
                />
                {labelSelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releaseLabel} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={quality}
                  placeholder='Calidad'
                  selected={qualitySelected}
                  onChange={(value) => {
                    setLoading(true)
                    setQualitySelected(value)
                  }}
                />
                {qualitySelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releaseQuality} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={sizes}
                  placeholder='Calibre'
                  selected={sizeSelected}
                  onChange={(value) => {
                    setLoading(true)
                    setSizeSelected(value)
                  }}
                />
                {sizeSelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releaseSize} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={packaging}
                  placeholder='Tipo Empaque'
                  selected={packagingSelected}
                  onChange={(value) => {
                    setLoading(true)
                    setPackagingSelected(value)
                  }}
                />
                {packagingSelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releasePackaging} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Combobox
                  className='flex-grow w-full'
                  mode='single'
                  options={presentations}
                  placeholder='Presentación'
                  selected={presentationsSelected}
                  onChange={(value) => {
                    setLoading(true)
                    setPresentationsSelected(value)
                  }}
                />
                {presentationsSelected !== '' && (
                  <IconSquareXFilled stroke={2} onClick={releasePresentations} className='w-auto cursor-pointer text-primary' />
                )}
              </div>

              <div className='flex items-center space-x-2 lg:col-span-auto lg:w-auto'>
                <Button variant='secondary' onClick={clearFilters} className='w-full lg:w-auto'>
                  <IconFilterX stroke={2} className='w-auto mr-2' />
                </Button>
              </div>
            </div>

            <div className='mb-4'>
              <Input type='text' value={query} onChange={(e) => handleQuery(e)} className='w-1/4' placeholder='Buscar' />
            </div>

            {loading
              ? (
                  disconnected
                    ? (<Disconnected />)
                    : (<PriceListLoading />)
                )
              : <PriceListTable priceListDetails={priceListDetails} />}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const Prices = (): JSX.Element => {
  return (
    <Layout>
      <PricesContent />
    </Layout>
  )
}

export default Prices
