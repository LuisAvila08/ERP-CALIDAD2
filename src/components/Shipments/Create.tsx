import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { API, OC, ALL } from '@/config/Constant'
import { OptionInterface } from '@/interfaces/Shipments'

const FormSchema = z.object({
  language: z.string({
    required_error: 'Selecciona una Orden de Compra'
  })
})

const fetchOC = async (): Promise<any> => {
  const res = await fetch(`${API}${OC}${ALL}`)
  const data = await res.json()
  return data
}

const refactorPO = (data = []): OptionInterface[] => {
  const newData = data.map((item: any) => {
    return {
      label: item.MovID,
      value: item.ID
    }
  })
  return newData
}

export function Create (): JSX.Element {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const [PO, setPO] = useState<OptionInterface[]>([])

  useEffect(() => {
    fetchOC()
      .then(data => {
        setPO(refactorPO(data.compra))
      })
      .catch(() => {
        console.log('Error al cargar OC')
      })

    console.log(PO)
  }, [])

  function onSubmit (data: z.infer<typeof FormSchema>): void {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Orden de Compra</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        field.value !== '' && 'text-muted-foreground'
                      )}
                    >
                      {field.value !== ''
                        ? PO.find(
                          (po) => po.value === field.value
                        )?.label
                        : 'Buscar Orden de Compra'}
                      <CaretSortIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput
                      placeholder='Buscar Orden de Compra...'
                      className='h-9'
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {PO.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value as string)
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Crear Embarque</Button>
      </form>
    </Form>
  )
}
