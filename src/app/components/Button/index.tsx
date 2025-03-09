'use client'

import { Button as ButtonSc } from '@/components/ui/button'
import { ButtonProps } from './types'
import { useRouter } from 'next/navigation'
export function Button({ children, url }: ButtonProps) {
  const route = useRouter()
  function handleClick() {
    route.push(`${url}`)
  }
  return <ButtonSc onClick={handleClick}>{children}</ButtonSc>
}
