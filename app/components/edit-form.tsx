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
} from 'react'
import { State, updatePurchase } from '@/app/lib/actions'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'

interface Purchase {
  id: string
  responsible: string
  amount: number
  description: string
  dateOfPurchase: Date
  installments: number
}


export default function FormEdit({
  purchases,
}: {
  purchases: Purchase
  responsible: Purchase[]
}) {
  const initialState: State = { message: undefined, errors: {} }
  const updatePurchaseById = updatePurchase.bind(null, purchases.id)
  const [state, formAction] = useActionState(updatePurchaseById, initialState)

  const [date, setDate] = useState<Date | undefined>(purchases.dateOfPurchase)
  const [formData, setFormData] = useState({
    responsible: purchases.responsible,
    amount: purchases.amount,
    description: purchases.description,
    dateOfPurchase: purchases.dateOfPurchase,
    installments: purchases.installments
  })

  console.log(purchases.dateOfPurchase)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(21, 0, 0, 0);
      setDate(newDate);
      setFormData(prev => ({
        ...prev,
        dateOfPurchase: newDate
      }));
    } else {
      setDate(undefined);
    }
  }

  return (
    <div className="container mx-auto p-6 rounded-md shadow-md bg-white max-w-lg">
      <form onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          const formData = new FormData(e.currentTarget);
          formAction(formData);
        });
      }} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="responsible" className="text-gray-700 font-semibold text-base">
            Responsável pela compra
          </Label>
          <Input
            className="border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            id="responsible"
            name="responsible"
            value={formData.responsible}
            onChange={handleInputChange}
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
          <Label htmlFor="amount" className="text-gray-700 font-semibold text-base">
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
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0,00"
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
          <Label htmlFor="description" className="text-gray-700 font-semibold text-base">
            Breve descrição
          </Label>
          <Input
            className="border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
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
                  format(date, 'dd/MM/yyyy')
                ) : (
                  <span className="text-gray-500">
                    {purchases.dateOfPurchase ? format(purchases.dateOfPurchase, 'dd/MM/yyyy') : 'Selecione a data da compra'}
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
                onSelect={handleDateSelect}
                initialFocus
                fromDate={new Date(2000, 0, 1)}
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
          <Label htmlFor="installments" className="text-gray-700 font-semibold text-base">
            Parcelas
          </Label>
          <Select
            onValueChange={(value) => {
              setFormData(prev => ({
                ...prev,
                installments: parseInt(value)
              }));
            }}
            name="installments"
            value={formData.installments.toString()}
          >
            <SelectTrigger
              className="w-full border rounded-md py-5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300 flex items-center justify-between"
              id="installments"
            >
              <SelectValue placeholder="Selecione o número de parcelas">
                {formData.installments}x
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
          Atualizar Compra
        </Button>
      </form>
    </div>
  )
}
