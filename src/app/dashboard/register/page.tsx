'use client'
import { IconCalendar, IconCurrencyReal } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from '@/components/ui/select'
import styles from './page.module.css'
import { createPurchase } from '@/app/query/Purchase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  responsible: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  amount: z
    .string({ required_error: 'Valor é obrigatório' })
    .refine(
      (value) => parseFloat(value.replace(/\./g, '').replace(',', '.')) > 0,
      {
        message: 'O valor deve ser maior que 0,00'
      }
    ),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  dateOfPurchase: z.date({
    required_error: 'Data da compra é obrigatória'
  }),
  installments: z.number({
    required_error: 'Selecione as parcelas'
  })
})

type Purchase = z.infer<typeof formSchema>

export default function Register() {
  const [displayAmount, setDisplayAmount] = useState('')
  const route = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Purchase>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responsible: '',
      amount: '0,00',
      description: '',
      dateOfPurchase: undefined,
      installments: 1
    },
    mode: 'onChange'
  })

  const dateOfPurchase = watch('dateOfPurchase')

  const onSubmit = handleSubmit(async (data) => {
    const formattedAmount = Number(
      data.amount.replace(/\./g, '').replace(',', '.')
    )
    const response = await createPurchase({
      ...data,
      amount: formattedAmount
    })
    if (response === true) {
      route.push('/dashboard')
    }
  })

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
    const numericValue = Number(rawValue.replace(/\D/g, '')) / 100 || 0
    setValue('amount', numericValue.toString()) // Agora armazena como string de número decimal
    setDisplayAmount(formatCurrency(rawValue))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nova Compra</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <Label htmlFor="responsible">Responsável pela compra</Label>
        <Input
          className={styles.input}
          id="responsible"
          placeholder="Ex: Fulano da Silva"
          {...register('responsible')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue('responsible', e.target.value)
          }
        />
        {errors.responsible && (
          <span className={styles.warn}>{errors.responsible.message}</span>
        )}

        <Label htmlFor="amount">Valor</Label>
        <div className={styles.containerAmout}>
          <IconCurrencyReal size={20} className={styles.iconCurrency} />
          <Input
            className={styles.inputAmount}
            id="amount"
            {...register('amount')}
            value={displayAmount}
            onChange={handleAmountChange}
            placeholder="0,00"
          />
          {errors.amount && (
            <span className={styles.warn}>{errors.amount.message}</span>
          )}
        </div>

        <Label htmlFor="description">Breve descrição</Label>
        <Input
          id="description"
          placeholder="Descrição da compra..."
          {...register('description')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue('description', e.target.value)
          }
        />
        {errors.description && (
          <span className={styles.warn}>{errors.description.message}</span>
        )}

        <Label htmlFor="dateOfPurchase">Data da compra</Label>
        <div className={styles.input}>
          <Popover>
            <PopoverTrigger asChild id="dateOfPurchase">
              <Button variant={'outline'} className={styles.inputDate}>
                <IconCalendar />
                {dateOfPurchase ? (
                  format(dateOfPurchase, 'P')
                ) : (
                  <span>Selecione a data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateOfPurchase}
                onSelect={(date) => setValue('dateOfPurchase', date!)}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfPurchase && (
            <span className={styles.warn}>{errors.dateOfPurchase.message}</span>
          )}
        </div>

        <Label htmlFor="date">Parcelas</Label>
        <Select
          onValueChange={(value) => {
            setValue('installments', Number(value))
          }}
          defaultValue={'1'}
        >
          <SelectTrigger className={styles.input}>
            <SelectValue placeholder="Selecione o número de parcelas" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
              <SelectItem key={number} value={number.toString()}>
                {number}x
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.installments && (
          <span className={styles.warn}>{errors.installments.message}</span>
        )}

        <Button type="submit">Cadastrar Compra</Button>
      </form>
    </div>
  )
}
