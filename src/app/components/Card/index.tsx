'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import styles from './card.module.css'

interface CheckboxTransactionItemProps {
  responsible: string
  amount: number
  description: string
  status?: boolean
  installments: number
  dateOfPurchase: Date
  onStatusChange?: (newStatus: boolean) => void
}

export default function CheckboxTransactionItem({
  responsible,
  amount,
  description,
  status = false,
  installments,
  dateOfPurchase,
  onStatusChange
}: CheckboxTransactionItemProps) {
  const formattedAmount = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })
  }
  const [isChecked, setIsChecked] = useState(status)
  const formattedDate = format(new Date(dateOfPurchase), 'MMM d')

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
    if (onStatusChange) {
      onStatusChange(checked)
    }
  }

  return (
    <div className={styles.card}>
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        aria-label={isChecked ? 'Pago' : 'A pagar'}
        className={styles.checkbox}
      />

      <div className={styles.infos}>
        <h3>{responsible}</h3>
        <div>
          <span className={styles.date}>{formattedDate}</span>
          {installments > 1 && <span>{installments}/12</span>}
        </div>
      </div>
      <div className={styles.amount}>
        <span>{formattedAmount(amount)}</span>
      </div>
    </div>
  )
}
