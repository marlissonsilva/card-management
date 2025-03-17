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
import { useActionState, useState, startTransition } from 'react'
import { createPurchase, State } from '@/app/lib/actions'
import { formatCurrency } from '@/app/lib/utils'
export default function Form() {
  const initialState: State = { message: undefined, errors: {} }
  const [state, formAction] = useActionState(createPurchase, initialState)

  const [date, setDate] = useState<Date>()
  const [selected, setSelected] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // Formatar valores antes de enviar
    const rawAmount = formData.get('amount') as string
    const formattedAmount =
      parseFloat(rawAmount.replace(/\./g, '').replace(',', '.')) || 0

    const rawDate = formData.get('dateOfPurchase') as string
    const formattedDate = rawDate ? new Date(rawDate).toISOString() : null

    const rawInstallments = formData.get('installments') as string
    const formattedInstallments = Number(rawInstallments) || 0

    // Criar um novo FormData e adicionar os valores formatados
    const formattedFormData = new FormData()
    formData.forEach((value, key) => {
      formattedFormData.append(key, value)
    })

    formattedFormData.set('amount', formattedAmount.toString())
    formattedFormData.set('dateOfPurchase', formattedDate || '')
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
    <div className={styles.container}>
      <h2 className={styles.title}>Nova Compra</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Label htmlFor="responsible">Responsável pela compra</Label>
        <Input
          className={styles.input}
          id="responsible"
          name="responsible"
          placeholder="Ex: Fulano da Silva"
        />
        <div
          className={styles.error_container}
          id="responsible-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.responsible &&
            state.errors.responsible.map((error: string) => (
              <p className={styles.message_error} key={error}>
                {error}
              </p>
            ))}
        </div>
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
        <div
          className={styles.error_container}
          id="amount-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.amount &&
            state.errors.amount.map((error: string) => (
              <p className={styles.message_error} key={error}>
                {error}
              </p>
            ))}
        </div>

        <Label htmlFor="description">Breve descrição</Label>
        <Input
          id="description"
          name="description"
          placeholder="Descrição da compra..."
        />
        <div
          className={styles.error_container}
          id="description-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p className={styles.message_error} key={error}>
                {error}
              </p>
            ))}
        </div>

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
        <div
          className={styles.error_container}
          id="dateOfPurchase-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.dateOfPurchase &&
            state.errors.dateOfPurchase.map((error: string) => (
              <p className={styles.message_error} key={error}>
                {error}
              </p>
            ))}
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
        <div
          className={styles.error_container}
          id="installments-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.installments &&
            state.errors.installments.map((error: string) => (
              <p className={styles.message_error} key={error}>
                {error}
              </p>
            ))}
        </div>
        {/* <div
          className={styles.error_container}
          id="form-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors && (
            <p className={styles.message_error}>{state.message}</p>
          )}
        </div> */}
        <Button type="submit">Cadastrar Compra</Button>
      </form>
    </div>
  )
}
