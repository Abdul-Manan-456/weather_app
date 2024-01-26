'use client'
import Image from 'next/image'
import { CardHeader } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { MouseEvent, useEffect, useContext, useRef } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'
import { getLocationCities } from './../../api/cityAutoComplete'
import { useState } from 'react'
import { useWeatherContext } from '@/store/WeatherContext'
import moment from 'moment'
interface cityValues {
  value?: string
  name: string
  id: number
}
const WeatherHeader = () => {
  const [open, setOpen] = useState(false)
  const [cityValue, setCityValue] = useState<cityValues[]>([])
  const [inputText, setInputText] = useState('')
  const { setCoord } = useWeatherContext()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value
    setInputText(text)
  }
  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();

    }
    setOpen(!open)
  }
  const handleOnSelect = (currentValue: string, v: any) => {
    setInputText(currentValue === v.name ? '' : currentValue)
    setCoord({ lat: v?.latitude, long: v?.longitude })
    setOpen(!open)
  }
  useEffect(() => {
    const fetchCities = setTimeout(async () => {
      if (inputText) {
        const cities = await getLocationCities(inputText)
        cities && setCityValue([...cities])
      }
    }, 900)
    return () => clearTimeout(fetchCities)
  }, [inputText])
  const date = new Date();
  const mntDate = moment(date).format('YYYY-MM-DD');
  return (
    <CardHeader className='text-sm  px-4 py-2'>
      <div className='flex mb-2 flex-row items-center justify-between pr-2 '>
        <Image src='/icons/logo.png' width={110} height={20} alt='logo' />
        <h1 className='font-bold text-base'>{mntDate}</h1>
        <Avatar className='pr-0 bg-white hover:bg-slate-400 cursor-pointer flex items-center justify-center'>
          <AvatarImage
            width={24}
            height={24}
            className='pr-0'
            src='/icons/github.svg'
            alt='github'
          />
        </Avatar>
      </div>
      <div onClick={handleOnClick} className='relative'>
        <Command>
          <CommandInput
            value={inputText}
            ref={inputRef}
            onInput={handleInputChange}
            className='h-8'
            placeholder='Search For Cities'
          />

          {open && (
            <>
              <CommandEmpty className='absolute z-10 left-0 py-3 rounded-sm text-sm text-center w-full bg-inherit top-9'>
                No options...
              </CommandEmpty>
              {cityValue.length !== 0 &&
                <CommandGroup className='absolute z-10  rounded-sm left-0 w-full bg-inherit top-9'>
                  {cityValue.map((v) => {
                    return (
                      <CommandItem
                        key={v.id}
                        value={v.name}
                        onSelect={(currentValue) =>
                          handleOnSelect(currentValue, v)
                        }
                      >
                        {v.name}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              }

            </>
          )}
        </Command>
        <div className='absolute w-0 h-5 border border-r-0 border-slate-400 top-1.5 right-9'></div>
        <div className='absolute text-center cursor-pointer right-3  top-1 w-5 h-5 inline-block font-extrabold text-slate-500 hover:text-slate-600'>
          {open ? <ChevronDown className='stroke-[3px]' /> : <ChevronUp className='stroke-[3px]' />}

        </div>

      </div>
    </CardHeader>
  )
}

export default WeatherHeader
