'use client'
import { Label } from '@/app/ui/label'
import styles from './form.module.css'
import { Input } from '@/app/ui/input'
import { IconCalendar, IconCurrencyReal } from '@tabler/icons-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/ui/popover'
import { Button } from '@/app/ui/button'
import { Calendar } from '@/app/ui/calendar'
import { format } from 'date-fns'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/app/ui/select'
import { useActionState, useState } from 'react'
import { createPurchase, State } from '@/app/lib/actions'
export default function Form() {
  const initialState: State = { message: undefined, errors: {} }
  const [state, formAction] = useActionState(createPurchase, initialState)

  const [date, setDate] = useState<Date>()
  const [selected, setSelected] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    const numberValue = Number(numericValue) / 100 || 0

    return numberValue.toLocaleString('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2
    })
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    setDisplayAmount(formatCurrency(rawValue))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nova Compra</h2>
      <form action={formAction} className={styles.form}>
        <Label htmlFor="responsible">Responsável pela compra</Label>
        <Input
          className={styles.input}
          id="responsible"
          name="responsible"
          placeholder="Ex: Fulano da Silva"
        />
        <Label htmlFor="amount">Valor</Label>
        <div className={styles.containerAmout}>
          <IconCurrencyReal size={20} className={styles.iconCurrency} />
          <Input
            className={styles.inputAmount}
            id="amount"
            name="amount"
            value={displayAmount}
            placeholder="0,00"
            onChange={handleAmountChange}
          />
        </div>
        <input
          type="hidden"
          name="amount"
          value={displayAmount.replace(/\./g, '').replace(',', '.') || '0.00'}
        />

        <Label htmlFor="description">Breve descrição</Label>
        <Input
          id="description"
          name="description"
          placeholder="Descrição da compra..."
        />

        <Label htmlFor="dateOfPurchase">Data da compra</Label>
        <div className={styles.input}>
          <Popover>
            <PopoverTrigger asChild id="dateOfPurchase" name="dateOfPurchase">
              <Button variant={'outline'} className={styles.inputDate}>
                <IconCalendar />
                {date ? (
                  format(date, 'PPP')
                ) : (
                  <span>Selecione a data da compra</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input
            type="hidden"
            name="dateOfPurchase"
            value={date ? format(date, 'yyyy-MM-dd') : ''}
          />
        </div>

        <Label htmlFor="installments">Parcelas</Label>
        <Select
          onValueChange={(value) => {
            setSelected(value)
          }}
          name="installments"
        >
          <SelectTrigger className={styles.input} id="installments">
            <SelectValue placeholder="Selecione o número de parcelas">
              {selected}x
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
              <SelectItem key={number} value={number.toString()}>
                {number}x
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Cadastrar Compra</Button>
      </form>
    </div>
  )
}
