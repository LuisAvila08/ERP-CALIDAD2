import { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PriceListDetailsInterface from '@/interfaces/PriceListDetails'
import moneyFormat from '@/lib/moneyFormat'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { API, PC } from '@/config/Constant'
import axios from 'axios'
import { usePriceListStore } from '@/stores/PriceListStore'
import { useCheckedStore } from '@/stores/CheckedStore'
import checkedInterface from '@/interfaces/Checked'
import { Progress } from '../ui/progress'
import useAuthStore from '@/stores/useAuthStore'

const DialogPrice = ({ Article }: { Article: PriceListDetailsInterface }): JSX.Element => {
  const [product, setProduct] = useState('')
  const [prices, setPrices] = useState<Array<Record<string, number>>>([])
  const [legend, setLegend] = useState<string>('Actualiza los precios de este articulo.')
  const [legendClass, setLegendClass] = useState<string>('')
  const [legendButton, setLegendButton] = useState<string>('Actualizar Precios')
  const [processing, setProcessing] = useState<boolean>(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const [filteredChecked, setFilteredChecked] = useState<checkedInterface[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [progressPercentage, setProgressPercentage] = useState<number>(0)

  const [user] = useAuthStore((state) => [state.user])

  const reload = usePriceListStore((state: { setReloadList: (arg0: number) => void }) => state.setReloadList)
  const checked = useCheckedStore((state) => state.checked)

  const addOrUpdatePrice = (newRecord: Record<string, number>): void => {
    setPrices(prevPrices => {
      const [newKey, newValue] = Object.entries(newRecord)[0]
      const existingIndex = prevPrices.findIndex(record => Object.keys(record)[0] === newKey)

      if (existingIndex !== -1) {
        return prevPrices.map((record, index) =>
          index === existingIndex ? { [newKey]: newValue } : record
        )
      } else {
        return [...prevPrices, newRecord]
      }
    })
  }

  useEffect(() => {
    if (user === null) {
      const user = JSON.parse(localStorage.getItem('user') ?? '')
      if(user !== null) {
        useAuthStore.setState({ user })
      }
    }
  }, [])

  useEffect(() => {
    const actualChecked = useCheckedStore.getState().checked
    const filtered = actualChecked.filter((checked) => checked.checked)

    setFilteredChecked(filtered as unknown as checkedInterface[])

    if (open) {
      setAlert(false)
    }
  }, [checked, open])

  const updatePrice = async (article: string, prices: Array<Record<string, number>>): Promise<void> => {
    const payload = {
      Article: article,
      Prices: prices,
      User: {
        id: user?.id,
        username: user?.username
      }
    }
    await axios.post(`${API}${PC}/create/multiple`, payload)
  }

  const handleClickPrice = (): void => {
    if (prices.length === 0) {
      setLegend('Por favor ingresa al menos un nuevo precio.')
      setLegendClass('text-destructive')
    } else {
      setProcessing(true)
      setLegendButton('Actualizando Precios...')
      setLegend('Actualizando Precios...')
      setLegendClass('text-foreground')

      updatePrice(product, prices).then(() => {
        setUpdated(true)
        setProcessing(false)
        reload(1)
      }).catch(() => {
        setProcessing(false)
      })
    }
  }

  const handleMultiple = (): void => {
    if (prices.length === 0) {
      setLegend('Por favor ingresa al menos un nuevo precio.')
      setLegendClass('text-destructive')
    } else {
      setAlert(true)
      setLegend('')
      setLegendClass('text-foreground')
    }
  }

  const processMultiple = async (): Promise<void> => {
    setLegend('Actualizando Precios... No cierre esta ventana. Por favor espere.')
    setLegendClass('text-foreground')
    setProcessing(true)
    setAlert(false)

    const total = filteredChecked.length

    for (let i = 0; i < total; i++) {
      const product = filteredChecked[i] as any
      const payload = { Article: product.Articulo, Prices: prices }

      try {
        await axios.post(`${API}${PC}/create/multiple`, payload)
      } catch (error) {
        console.error('Error al procesar el producto:', product, error)
      }

      setProgressPercentage((100 / total) * (i + 1))
    }

    setProcessing(false)
    setUpdated(true)
    reload(1)
  }

  const handleInput = (key: string, newValue: string, article: string): void => {
    setProduct(article)
    addOrUpdatePrice({ [key]: Number(newValue) })
  }

  return (
    updated
      ? (
        <DialogContent className='sm:max-w-full md:w-[50vW]' onCloseAutoFocus={() => setUpdated(false)}>
          <DialogHeader>
            <DialogTitle>Precios Actualizados</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        )

      : (
        <DialogContent className='sm:max-w-full md:w-[50vW]' onOpenAutoFocus={() => setOpen(true)} onCloseAutoFocus={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle><span className='font-bold text-primary'>{Article.Articulo}</span></DialogTitle>
            <DialogDescription>
              {Article.Descripción}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Table>
              <TableCaption className={legendClass}>{legend}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Lista</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Nuevo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(Article)
                  .filter(key => key !== 'Articulo' && key !== 'Descripción')
                  .map((key) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{moneyFormat(Article[key])}</TableCell>
                      <TableCell>
                        <Input type='number' id={key} defaultValue={Article[key]} onInput={(e) => handleInput(key, (e.target as HTMLInputElement).value, Article.Articulo)} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          {
            alert && (
              <>
                <h4 className='mb-0 text-primary'>¡Atención!</h4>
                <p>¿Estás seguro de actualizar los precios de <span className='font-bold text-primary'>{filteredChecked.length}</span> artículos?</p>
              </>
            )
          }
          {
            processing && <Progress value={progressPercentage} className='w-full' />
          }
          <DialogFooter>
            {alert
              ? (
                <>
                  <Button type='button' variant='secondary' onClick={() => setAlert(false)} disabled={processing}>Cancelar</Button>
                  <Button type='button' onClick={processMultiple} disabled={processing}>Actualizar Selección</Button>
                </>
                )
              : (
                <>
                  {filteredChecked.length > 1 && (
                    <Button type='button' variant='secondary' onClick={handleMultiple} disabled={processing}>Actualizar Selección</Button>
                  )}
                  <Button type='submit' onClick={handleClickPrice} disabled={processing}>
                    {legendButton}
                  </Button>
                </>
                )}
          </DialogFooter>
        </DialogContent>
        )
  )
}

export default DialogPrice
