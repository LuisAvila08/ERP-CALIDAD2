import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import PriceListDetailsInterface from '@/interfaces/PriceListDetails'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API, LOT_SERIES, SPECIAL_PRICES } from '@/config/Constant'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import { Input } from '../ui/input'
import { usePriceListStore } from '@/stores/PriceListStore'
import { Skeleton } from '../ui/skeleton'
import Progress from '../Progress'
import { SpecialPricesInterface, SpecialPricesResponseInterface } from '@/interfaces/SpecialPrices'

TimeAgo.addLocale(es)

interface ProductInterface {
  serie: string
  lastPrice?: number
  newPrice?: number
  article: string
  comment?: string
}

const getLotSeries = async ({ Articulo }: { Articulo: string }): Promise<SpecialPricesResponseInterface> => {
  return await new Promise((resolve, reject) => {
    axios.get(`${API}${LOT_SERIES}/special/id/${Articulo}`).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

const updateSpecialPrices = async ({ products }: { products: ProductInterface[] }): Promise<void> => {
  return await new Promise((resolve, reject) => {
    axios.post(`${API}${SPECIAL_PRICES}/create`, { products }).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

const DialogLot = ({ Article }: { Article: PriceListDetailsInterface }): JSX.Element => {
  const [legend, setLegend] = useState<string>('Consultando Existencias...')
  const [legendColor, setLegendColor] = useState<string>('text-foreground')
  const [lotSeries, setLotSeries] = useState<any[]>([])
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [processing, setProcessing] = useState<boolean>(false)
  const [buttonLegend, setButtonLegend] = useState<string>('Actualizar Precios Especiales')
  const [updated, setUpdated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const reload = usePriceListStore((state: { setReloadList: (arg0: number) => void }) => state.setReloadList)

  useEffect(() => {
    getLotSeries({ Articulo: Article.Articulo })
      .then((response) => {
        setLotSeries(response.response)
        setLegend('')
      }).catch((error) => {
        setLegend(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [updated])

  const handleUpdateSpecialPrice = (): void => {
    if (products.length === 0) {
      setLegendColor('text-destructive')
      setLegend('Por favor ingresa al menos un nuevo precio.')
    }
    setButtonLegend('Actualizando Precios Especiales...')
    setProcessing(true)

    updateSpecialPrices({ products })
      .then(() => {
        setProcessing(false)
        setButtonLegend('Actualizar Precios Especiales')
        setUpdated(true)
        reload(1)
      }).catch(() => {
        setProcessing(false)
      })
  }

  const updateProducts = (newProduct: ProductInterface): void => {
    const existingProductIndex = products.findIndex(product =>
      product.serie === newProduct.serie && product.article === newProduct.article
    )

    if (existingProductIndex !== -1) {
      products[existingProductIndex] = {
        ...products[existingProductIndex],
        ...newProduct
      }
    } else {
      products.push(newProduct)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputElement = event.target

    const serie = inputElement.getAttribute('data-serie')
    const article = inputElement.getAttribute('data-article')
    const valueType = inputElement.getAttribute('data-type')
    const existingProduct = products.find(product => product.serie === serie && product.article === article)

    if (valueType === 'price') {
      const newPrice = parseFloat(inputElement.value)
      const lastPrice = parseFloat(inputElement.getAttribute('data-past') ?? '0')

      const newProduct = {
        serie: serie as string,
        lastPrice,
        newPrice,
        article: article as string,
        comment: existingProduct?.comment ?? ''
      }

      setLegendColor('text-foreground')
      setLegend('')
      updateProducts(newProduct)
      setProducts([...products])
    } else if (valueType === 'comment') {
      const comment = inputElement.value
      const lastPrice = parseFloat(inputElement.getAttribute('data-past') ?? '0')

      const newProduct = {
        serie: serie as string,
        lastPrice,
        article: article as string,
        comment
      }

      setLegendColor('text-foreground')
      setLegend('')
      updateProducts(newProduct)
      setProducts([...products])
    }
  }

  return (
    updated
      ? (
        <DialogContent className='sm:max-w-full md:w-[50vW]' onCloseAutoFocus={() => setUpdated(false)}>
          <DialogHeader>
            <DialogTitle><span className='font-bold text-primary'>{Article.Articulo}</span></DialogTitle>
          </DialogHeader>
          <p>Los Precios Especiales han sido actualizados.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary'>Continuar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        )
      : (
        <DialogContent className='sm:max-w-full md:w-[50vW]'>
          <DialogHeader>
            <DialogTitle><span className='font-bold text-primary'>{Article.Articulo}</span></DialogTitle>
            <DialogDescription>
              {Article.Descripción}
            </DialogDescription>
          </DialogHeader>
          <div className='p-1 my-2 border rounded-md'>
            <Table
              className='relative w-full h-10 overflow-clip'
              divClassName='max-h-[50vh] overflow-y-auto'
            >
              <TableHeader className='sticky top-0 w-full h-10 bg-background'>
                <TableRow>
                  <TableHead>Serie/Lote</TableHead>
                  <TableHead>Existencia</TableHead>
                  <TableHead>Precio Especial</TableHead>
                  <TableHead>Nuevo Precio</TableHead>
                  <TableHead>Nota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  isLoading
                    ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton className='w-32 h-6' />
                        </TableCell>
                        <TableCell>
                          <Skeleton className='w-24 h-6' />
                        </TableCell>
                        <TableCell>
                          <Skeleton className='w-16 h-6' />
                        </TableCell>

                        <TableCell>
                          <Skeleton className='w-32 h-6' />
                        </TableCell>

                      </TableRow>
                      )
                    : lotSeries.map((lotSeries: SpecialPricesInterface) => (
                      <TableRow key={`${lotSeries.SerieLote}`}>
                        <TableCell>{lotSeries.SerieLote}</TableCell>
                        <TableCell>{Intl.NumberFormat('es-MX').format(lotSeries.Total)}</TableCell>
                        <TableCell>{lotSeries?.Precio ?? '-'}</TableCell>
                        <TableCell>
                          <Input
                            type='number'
                            data-article={Article.Articulo}
                            data-past={lotSeries?.Precio}
                            data-serie={lotSeries.SerieLote}
                            data-type='price'
                            onChange={handleInputChange}
                            defaultValue={lotSeries?.Precio ?? 0}
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type='text'
                            data-article={Article.Articulo}
                            data-past={lotSeries?.Precio}
                            data-serie={lotSeries.SerieLote}
                            data-type='comment'
                            onChange={handleInputChange}
                            defaultValue={lotSeries?.Nota ?? ''}
                          />
                        </TableCell>

                      </TableRow>
                    ))
                }

              </TableBody>
            </Table>
            <div className={legendColor}>{isLoading ? <Progress /> : legend}</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cerrar</Button>
            </DialogClose>
            <Button onClick={handleUpdateSpecialPrice} disabled={processing || isLoading}>{buttonLegend}</Button>
          </DialogFooter>
        </DialogContent>
        )
  )
}

export default DialogLot
