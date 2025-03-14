import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, '')
  const numberValue = Number(numericValue) / 100 || 0

  return numberValue.toLocaleString('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}