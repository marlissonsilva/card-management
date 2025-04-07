import { ReactElement, ReactNode } from 'react'
import { Logo } from './logo'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <div className="h-24 flex items-end w-full md:h-40 bg-violet-400 rounded-2xl p-6">
      <Logo />
    </div>
  )
}
