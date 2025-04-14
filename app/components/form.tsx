'use client'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { IconCalendar, IconCurrencyReal } from '@tabler/icons-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/components/ui/popover'
import { format } from 'date-fns'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/app/components/ui/select'
import {
  useActionState,
  useState,
  startTransition,
  SetStateAction
} from 'react'
import { createPurchase, State } from '@/app/lib/actions'
import formatCurrency from '@/app/lib/utils'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'

export default function Form() {
  const initialState: State = { message: undefined, errors: {} }
  const [state, formAction] = useActionState(createPurchase, initialState)

  const [date, setDate] = useState<Date>()
  const [selected, setSelected] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const rawAmount = formData.get('amount') as string
    const formattedAmount =
      parseFloat(rawAmount.replace(/\./g, '').replace(',', '.')) || 0

    const rawDate = formData.get('dateOfPurchase') as string
    const date = new Date(rawDate)
    date.setHours(21, 0, 0, 0)
    const formattedDate = date.toISOString()

    const rawInstallments = formData.get('installments') as string
    const formattedInstallments = Number(rawInstallments) || 0

    const formattedFormData = new FormData()
    formData.forEach((value, key) => {
      formattedFormData.append(key, value)
    })

    formattedFormData.set('amount', formattedAmount.toString())
    formattedFormData.set('dateOfPurchase', formattedDate)
    formattedFormData.set('installments', formattedInstallments.toString())

    startTransition(() => {
      formAction(formattedFormData)
    })
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    setDisplayAmount(formatCurrency(rawValue))
  }

  return (
    <div className="container mx-auto p-6 rounded-md shadow-md bg-white max-w-lg">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label
            htmlFor="responsible"
            className="text-gray-700 font-semibold text-base"
          >
            Responsável pela compra
          </Label>
          <Input
            className="border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            id="responsible"
            name="responsible"
            placeholder="Ex: Fulano da Silva"
          />
          <div
            className="text-red-500 text-sm mt-1"
            id="responsible-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.responsible &&
              state.errors.responsible.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="amount"
            className="text-gray-700 font-semibold text-base"
          >
            Valor
          </Label>
          <div className="relative">
            <IconCurrencyReal
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <Input
              className="border rounded-md py-5 pl-8 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
              id="amount"
              name="amount"
              value={displayAmount}
              placeholder="0,00"
              onChange={handleAmountChange}
            />
          </div>
          <div
            className="text-red-500 text-sm mt-1"
            id="amount-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor="description"
            className="text-gray-700 font-semibold text-base"
          >
            Breve descrição
          </Label>
          <Input
            className="border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            id="description"
            name="description"
            placeholder="Descrição da compra..."
          />
          <div
            className="text-red-500 text-sm mt-1"
            id="description-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor="dateOfPurchase"
            className="text-gray-700 font-semibold text-base"
          >
            Data da compra
          </Label>
          <Popover>
            <PopoverTrigger asChild id="dateOfPurchase" name="dateOfPurchase">
              <Button
                variant={'outline'}
                className="w-full flex items-center justify-start gap-2 border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                <IconCalendar className="text-gray-500" />
                {date ? (
                  format(date, 'PPP')
                ) : (
                  <span className="text-gray-500">
                    Selecione a data da compra
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto p-0 shadow-md border rounded-md bg-white"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                toDate={new Date()}
              />
            </PopoverContent>
          </Popover>
          <input
            type="hidden"
            name="dateOfPurchase"
            value={date ? format(date, 'yyyy-MM-dd') + 'T00:00:00' : ''}
          />
          <div
            className="text-red-500 text-sm mt-1"
            id="dateOfPurchase-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.dateOfPurchase &&
              state.errors.dateOfPurchase.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor="installments"
            className="text-gray-700 font-semibold text-base"
          >
            Parcelas
          </Label>
          <Select
            onValueChange={(value: SetStateAction<string>) => {
              setSelected(value)
            }}
            name="installments"
          >
            <SelectTrigger
              className="w-full border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300 flex items-center justify-between"
              id="installments"
            >
              <SelectValue placeholder="Selecione o número de parcelas">
                {selected}x
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="shadow-md border rounded-md bg-white">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div
            className="text-red-500 text-sm mt-1"
            id="installments-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.installments &&
              state.errors.installments.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        <Button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          Cadastrar Compra
        </Button>
      </form>
    </div>
  )
}
