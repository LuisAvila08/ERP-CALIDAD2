'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ComboboxOptions {
  value: string
  label: string
}

type Mode = 'single' | 'multiple'

interface ComboboxProps {
  mode?: Mode
  options: ComboboxOptions[]
  selected: string | string[]
  className?: string
  placeholder?: string
  onChange?: (event: string | string[]) => void
  onCreate?: (value: string) => void
}

const Combobox = ({ options, selected, className, placeholder, mode = 'single', onChange, onCreate }: ComboboxProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState<string>('')

  return (
    <div className={cn('block', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            key='combobox-trigger'
            type='button'
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='justify-between w-full'
          >

            {
            (selected.length > 0)
              ? (
                <div className='relative flex flex-wrap items-center flex-grow mr-auto overflow-hidden'>
                  <span>
                    {
                    mode === 'multiple' && Array.isArray(selected)
                      ? selected
                        .map(
                          (selectedValue: string) =>
                            options.find((item) => item.value === selectedValue)
                              ?.label
                        )
                        .join(', ')
                      : mode === 'single' &&
                      options.find((item) => String(item.value).toLowerCase() === String(selected).toLowerCase())?.label
                    }
                  </span>
                </div>
                )
              : (
                <span>{placeholder ?? 'Select Item...'}</span>
                )
          }
            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='max-w-sm p-0 w-72'>
          <Command
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) return 1
              return 0
            }}
            // shouldFilter={true}
          >
            <CommandInput
              placeholder={placeholder ?? 'Seleccione una Opción...'}
              value={query}
              onValueChange={(value: string) => setQuery(value)}
            />
            <CommandEmpty
              onClick={() => {
                if (onCreate != null) {
                  onCreate(query)
                  setQuery('')
                }
              }}
              className='flex items-center justify-center gap-1 italic cursor-pointer'
            >
              <p>No hay elementos</p>
              <p className='block font-semibold truncate max-w-48 text-primary'>
                {query}
              </p>
            </CommandEmpty>
            <ScrollArea>
              <div className='max-h-80'>
                <CommandGroup>
                  <CommandList>
                    {options.map((option) => (
                      <CommandItem
                        key={option.label}
                        value={option.label}
                        onSelect={(_currentValue) => {
                          if (onChange != null) {
                            if (mode === 'multiple' && Array.isArray(selected)) {
                              onChange(
                                selected.includes(option.value)
                                  ? selected.filter(
                                    (item) => item !== option.value
                                  )
                                  : [...selected, option.value]
                              )
                            } else {
                              onChange(option.value)
                            }
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selected.includes(option.value)
                              ? 'opacity-100'
                              : 'opacity-0'

                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox
