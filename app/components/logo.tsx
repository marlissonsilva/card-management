import { IconCards } from '@tabler/icons-react'

interface LogoProps {
  size?: string
}

export function Logo({ size }: LogoProps) {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white gap-2 `}
    >
      <span>
        <IconCards className="h-12 w-12 rotate-[15deg]" />
      </span>
      <p className={size ? size : 'text-[24px] md:text-[44px]'}>
        Card Management
      </p>
    </div>
  )
}
