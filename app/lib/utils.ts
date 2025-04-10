import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export default function formatCurrency(value: number | string) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

export const formatDateToLocal = (dateStr: Date, locale: string = 'pt-BR') => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}
