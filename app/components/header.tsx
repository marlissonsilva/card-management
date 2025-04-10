import { Logo } from './logo'

export function Header() {
  return (
    <div className="h-24 flex items-end w-full md:h-40 bg-violet-400 rounded-2xl p-6">
      <Logo />
    </div>
  )
}
