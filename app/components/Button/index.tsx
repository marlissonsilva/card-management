'use client'

import { Button as ButtonSc } from '@/app/ui/button'
import { ButtonProps } from './types'
import { useRouter } from 'next/navigation'
export function Button({ children, url, color }: ButtonProps) {
  const route = useRouter()
  function handleClick() {
    route.push(`${url}`)
  }
  return (
    <ButtonSc onClick={handleClick} className={color}>
      {children}
    </ButtonSc>
  )
}
